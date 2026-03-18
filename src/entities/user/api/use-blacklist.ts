import { $api } from '@/shared/api/repository/$api';
import {
  infinityQueryOptimisticInsert,
  infinityQueryOptimisticRemove,
} from '@/shared/lib/infinity-query-optimistic-update';
import { notify } from '@/shared/lib/notifications';
import type { components } from '@/shared/types/v1';
import type { InfiniteData } from '@tanstack/react-query';

type Blacklist = components['schemas']['BlacklistInfoResponse'];
type BlacklistData = components['schemas']['BlacklistInfoData'];
type InfinityBlacklist = InfiniteData<Blacklist>;
interface MutateContext {
  previous?: InfinityBlacklist;
}

type BlacklistItem = BlacklistData['items'][number];
const blackListQueryKey = $api.typedQueryKey('get', '/blacklist/list');

export const useAddBlacklist = () => {
  return $api.user.jwt.useMutation('post', '/blacklist/add', {
    async onMutate({ body }, { client }): Promise<MutateContext> {
      await client.cancelQueries({ queryKey: blackListQueryKey });
      const previous = client.getQueriesData<InfinityBlacklist>({
        queryKey: blackListQueryKey,
      });

      const user = client.getQueryData<
        components['schemas']['ProfileResponse']
      >(
        $api.profile.query.queryOptions('get', '/{user_id}', {
          params: { path: { user_id: body.user_id ?? '' } },
        }).queryKey
      );
      const dataForInsert: BlacklistItem = user?.data ?? {
        created_at: Date.now().toString(),
        user_id: body.user_id ?? '',
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

    onError(error, variables, onMutateResult, { client }) {
      const typedContext = onMutateResult as MutateContext;
      client.setQueriesData<InfinityBlacklist>(
        { queryKey: blackListQueryKey },
        typedContext.previous
      );
      notify.error();
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      await context.client.invalidateQueries({ queryKey: blackListQueryKey });
    },
  });
};

export const useRemoveFromBlacklist = () => {
  return $api.user.jwt.useMutation('delete', '/blacklist/remove', {
    async onMutate({ body }, { client }) {
      await client.cancelQueries({ queryKey: blackListQueryKey });

      client.setQueriesData<InfinityBlacklist>(
        { queryKey: blackListQueryKey },
        (old) => {
          if (!old) return old;
          return infinityQueryOptimisticRemove<Blacklist, BlacklistItem>(
            old,
            (page) => page.data.items,
            (item) => item.user_id === body.user_id
          );
        }
      );
    },

    onError(_error, _variables, onMutateResult, { client }) {
      const typedContext = onMutateResult as MutateContext;
      client.setQueriesData<InfinityBlacklist>(
        { queryKey: blackListQueryKey },
        typedContext.previous
      );
      notify.error();
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      await context.client.invalidateQueries({ queryKey: blackListQueryKey });
    },
  });
};
