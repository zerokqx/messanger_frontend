import { $api } from '@/shared/api/repository/$api';
import { infinityQueryOptimisticRemove } from '@/shared/lib/infinity-query-optimistic-update';
import type { components } from '@/shared/types/v1';
import type { InfiniteData, QueryKey } from '@tanstack/react-query';

type Count = components['schemas']['ContactCountResponse'];
type ContactResponse = components['schemas']['ContactInfoResponse'];

interface MutateContext {
  prevCount?: Count;
  prevContacts: [QueryKey, InfiniteData<ContactResponse> | undefined][];
}

const contactListFilter = {
  queryKey: ['get', '/contact/list'] as const,
  exact: false,
};
const countOptions = $api.user.jwt.queryOptions('get', '/contact/count', {});

export const useContactRemove = () => {
  return $api.user.jwt.useMutation('delete', '/contact/remove', {
    async onMutate(variables, context): Promise<MutateContext> {
      await Promise.all([
        context.client.cancelQueries(contactListFilter),
        context.client.cancelQueries(countOptions),
      ]);

      const prevCount = context.client.getQueryData<Count>(countOptions.queryKey);
      const prevContacts = context.client.getQueriesData<
        InfiniteData<ContactResponse>
      >(contactListFilter);

      context.client.setQueryData(
        countOptions.queryKey,
        (old: Count | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: { count: Math.max(0, old.data.count - 1) },
          };
        }
      );

      context.client.setQueriesData<InfiniteData<ContactResponse>>(
        contactListFilter,
        (old) => {
          if (!old) return old;

          return infinityQueryOptimisticRemove(
            old,
            (page) => page.data.items,
            (item) => item.user_id === variables.body.user_id
          );
        }
      );

      return { prevCount, prevContacts };
    },
    onError(_error, _variables, onMutateResult, context) {
      const typedResult = onMutateResult as MutateContext | undefined;
      if (typedResult?.prevCount) {
        context.client.setQueryData(countOptions.queryKey, typedResult.prevCount);
      }

      typedResult?.prevContacts.forEach(([queryKey, data]) => {
        context.client.setQueryData(queryKey, data);
      });
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries(contactListFilter),
        context.client.invalidateQueries(countOptions),
      ]);
    },
  });
};
