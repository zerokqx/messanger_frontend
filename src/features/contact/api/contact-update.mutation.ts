import { makeGetUserById } from '@/entities/user';
import type {
  ContactInfoResponse,
  ContactInfoData,
} from '@/shared/api/orval/user-service/user-service.schemas';
import type { ProfileByUserIdResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';
import {
  getGetContactsContactListGetInfiniteQueryKey,
  useUpdateContactContactUpdatePatch,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import { getSearchByQueryUserSearchGetQueryKey } from '@/shared/api/orval/feed-service/v1-feed-user-search/v1-feed-user-search';
import { infinityQueryOptimisticUpdate } from '@/shared/lib/infinity-query-optimistic-update';
import { notify } from '@/shared/lib/notifications';
import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface MutateContext {
  prevGetById?: ProfileByUserIdResponse;
  prevContactList: [QueryKey, InfiniteData<ContactInfoResponse> | undefined][];
}

const contactOpt = getGetContactsContactListGetInfiniteQueryKey();
const searchOpt = getSearchByQueryUserSearchGetQueryKey();

export const useContactUpdate = () => {
  const { t } = useTranslation(['api-errors']);
  return useUpdateContactContactUpdatePatch({
    mutation: {
      async onMutate({ data }, context) {
        const getUserByIdOpt = makeGetUserById(data.user_id);
        await Promise.all([
          context.client.cancelQueries({
            queryKey: contactOpt,
          }),
          context.client.cancelQueries(getUserByIdOpt),
          context.client.cancelQueries({ queryKey: searchOpt }),
        ]);

        const prevGetById = context.client.getQueryData<ProfileByUserIdResponse>(
          getUserByIdOpt.queryKey
        );
        const prevContactList = context.client.getQueriesData<
          InfiniteData<ContactInfoResponse>
        >({ queryKey: contactOpt });

        context.client.setQueryData<ProfileByUserIdResponse>(
          getUserByIdOpt.queryKey,
          (old) => {
            if (!old) return old;

            return {
              ...old,
              data: {
                ...old.data,
                custom_name: data.custom_name,
              },
            };
          }
        );

        context.client.setQueriesData<InfiniteData<ContactInfoResponse>>(
          {
            queryKey: contactOpt,
          },
          (old) => {
            if (!old) return old;

            return infinityQueryOptimisticUpdate<
              ContactInfoResponse,
              ContactInfoData['items'][number]
            >(
              old,
              (page) => page.data.items,
              (item) => item.user_id === data.user_id,
              (draft) => {
                draft.custom_name = data.custom_name;
              }
            );
          }
        );

        return { prevGetById, prevContactList };
      },
      onError(_error, variables, onMutateResult, context) {

        context.client.setQueryData(
          makeGetUserById(variables.data.user_id).queryKey,
          onMutateResult?.prevGetById
        );
        context.client.setQueriesData(
          { queryKey: contactOpt },
          onMutateResult?.prevContactList
        );
        notify.error({ message: t('api-errors:contact_update') });
      },
      async onSettled(_data, _error, variables, _onMutateResult, context) {
        await Promise.all([
          context.client.invalidateQueries(
            makeGetUserById(variables.data.user_id)
          ),
          context.client.invalidateQueries({
            queryKey: contactOpt,
          }),
          context.client.invalidateQueries({
            queryKey: searchOpt,
          }),
        ]);
      },
    },
  });
};
