import {
  infinityQueryOptimisticInsert,
  infinityQueryOptimisticRemove,
  infinityQueryOptimisticUpdate,
} from '@/shared/lib/infinity-query-optimistic-update';
import { notify } from '@/shared/lib/notifications';
import type { InfiniteData } from '@tanstack/react-query';
import type {
  BlacklistInfoResponse as Blacklist,
  BlacklistInfoData as BlacklistData,
} from '@/shared/api/orval/user-service/user-service.schemas';
import {
  getGetBlacklistBlacklistListGetQueryKey,
  useAddToBlacklistBlacklistAddPost,
  useRemoveFromBlacklistBlacklistRemoveDelete,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import { getGetUserProfileByUserIdUserIdGetQueryKey } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import type { ProfileByUserIdResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { updateUserLocalCacheByUserId } from './use-get-user-by-id';

type InfinityBlacklist = InfiniteData<Blacklist>;
interface MutateContext {
  previous: [readonly unknown[], InfinityBlacklist | undefined][];
}

type BlacklistItem = BlacklistData['items'][number];
const blackListQueryKey = getGetBlacklistBlacklistListGetQueryKey();

export const useAddBlacklist = () => {
  return useAddToBlacklistBlacklistAddPost({
    mutation: {
      async onMutate({ data }, { client }): Promise<MutateContext> {
        await client.cancelQueries({ queryKey: blackListQueryKey });
        const previous = client.getQueriesData<InfinityBlacklist>({
          queryKey: blackListQueryKey,
        });

        await updateUserLocalCacheByUserId(
          client,
          data.user_id ?? '',
          (draft) => {
            draft.data.relationship.is_target_user_blocked_by_current_user = true;
          }
        );

        const user = client.getQueryData<ProfileByUserIdResponse>(
          getGetUserProfileByUserIdUserIdGetQueryKey(data.user_id ?? '')
        );
        const dataForInsert: BlacklistItem = user?.data ?? {
          created_at: Date.now().toString(),
          user_id: data.user_id ?? '',
          login: 'Loading...',
        };
        client.setQueriesData<InfinityBlacklist>(
          { queryKey: blackListQueryKey },
          (old) => {
            if (!old) return old;
            return infinityQueryOptimisticInsert<Blacklist, BlacklistItem>(
              old,
              (page) => page.data.items,
              dataForInsert
            );
          }
        );

        return { previous };
      },

      onError(_error, _variables, onMutateResult, { client }) {
        onMutateResult?.previous.forEach(([queryKey, data]) => {
          client.setQueryData(queryKey, data);
        });
        notify.error();
      },
      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await context.client.invalidateQueries({ queryKey: blackListQueryKey });
      },
    },
  });
};

export const useRemoveFromBlacklist = () => {
  return useRemoveFromBlacklistBlacklistRemoveDelete({
    mutation: {
      async onMutate({ data }, { client }) {
        await client.cancelQueries({ queryKey: blackListQueryKey });
        const previous = client.getQueriesData<InfinityBlacklist>({
          queryKey: blackListQueryKey,
        });
        const queryKeyUser = getGetUserProfileByUserIdUserIdGetQueryKey(
          data.user_id
        );
        const previousUser = client.getQueryData(queryKeyUser);
        await updateUserLocalCacheByUserId(client, data.user_id, (draft) => {
          draft.data.relationship.is_target_user_blocked_by_current_user = false;
        });
        client.setQueriesData<InfinityBlacklist>(
          { queryKey: blackListQueryKey },
          (old) => {
            if (!old) return old;
            return infinityQueryOptimisticRemove<Blacklist, BlacklistItem>(
              old,
              (page) => page.data.items,
              (item) => item.user_id === data.user_id
            );
          }
        );

        return { previous, queryKeyUser, previousUser };
      },

      onError(_error, _variables, onMutateResult, { client }) {
        onMutateResult?.previous.forEach(([queryKey, data]) => {
          client.setQueryData(queryKey, data);
        });
        if (onMutateResult?.queryKeyUser) {
          client.setQueryData(
            onMutateResult.queryKeyUser,
            onMutateResult.previousUser
          );
        }

        notify.error();
      },
      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await Promise.all([
          context.client.invalidateQueries({ queryKey: blackListQueryKey }),
          context.client.invalidateQueries({
            queryKey: _onMutateResult?.queryKeyUser,
          }),
        ]);
      },
    },
  });
};
