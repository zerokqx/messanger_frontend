import type {
  ProfileByUserIdResponse,
} from '@/shared/api/orval/profile-service/profile-service.schemas';
import {
  getGetUserProfileByUserIdUserIdGetQueryKey,
} from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import {
  type ContactInfoData,
  type ContactCountResponse,
  type ContactInfoResponse,
  type ContactInfo,
} from '@/shared/api/orval/user-service/user-service.schemas';
import {
  getGetContactCountContactCountGetQueryKey,
  getGetContactsContactListGetInfiniteQueryKey,
  useAddContactContactAddPost,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import type { InfiniteData } from '@tanstack/react-query';

interface MutateContext {
  prevCount?: Count;
}

type ContactsInfiniteData = InfiniteData<ContactInfoResponse>;
type Count = ContactCountResponse;

export const useContactAdd = () => {
  return useAddContactContactAddPost({
    mutation: {
      async onMutate({ data }, context) {
        const userQueryKey = getGetUserProfileByUserIdUserIdGetQueryKey(
          data.user_id ?? ''
        );
        await Promise.all([
          context.client.cancelQueries({
            queryKey: getGetContactsContactListGetInfiniteQueryKey(),
          }),
          context.client.cancelQueries({
            queryKey: getGetContactCountContactCountGetQueryKey(),
            exact: true,
          }),
          context.client.cancelQueries({
            queryKey: userQueryKey,
          }),
        ]);

        const user =
          context.client.getQueryData<ProfileByUserIdResponse>(userQueryKey);

        const prevContacts =
          context.client.getQueriesData<ContactsInfiniteData>({
            queryKey: getGetContactsContactListGetInfiniteQueryKey(),
          });

        const prevCount = context.client.getQueryData<ContactCountResponse>(
          getGetContactCountContactCountGetQueryKey()
        );
        if (user) {
          const contact: ContactInfo = {
            user_id: user.data.user_id,
            login: user.data.login,
            full_name: user.data.full_name,
            custom_name: null,
            friend_code: false,
            created_at: new Date().toISOString(),
            last_seen_at: user.data.last_seen_at,
          };
          context.client.setQueriesData<ContactsInfiniteData>(
            {
              queryKey: getGetContactsContactListGetInfiniteQueryKey(),
            },
            (old) => {
              if (!old) return old;
              return infinityQueryOptimisticInsert<
                ContactInfoResponse,
                ContactInfoData['items'][number]
              >(old, (page) => page.data.items, contact);
            }
          );

          context.client.setQueryData(
            getGetContactCountContactCountGetQueryKey(),
            (old: Count | undefined) => {
              if (!old) return old;

              return {
                ...old,
                data: { count: old.data.count + 1 },
              };
            }
          );
        }

        return { prevCount };
      },
      onError(_error, _variables, onMutateResult, context) {
        if (onMutateResult?.prevCount) {
          context.client.setQueryData(
            getGetContactCountContactCountGetQueryKey(),
            onMutateResult.prevCount
          );
        }
      },
      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: getGetContactsContactListGetInfiniteQueryKey(),
            exact: false,
          }),
          context.client.invalidateQueries({
            queryKey: getGetContactCountContactCountGetQueryKey(),
            exact: true,
          }),
        ]);
      },
    },
  });
};
