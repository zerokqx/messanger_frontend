import type {
  ContactCountResponse,
  ContactInfoResponse,
} from '@/shared/api/orval/user-service/user-service.schemas';
import {
  getGetContactCountContactCountGetQueryKey,
  getGetContactsContactListGetInfiniteQueryKey,
  useRemoveContactContactRemoveDelete,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import { infinityQueryOptimisticRemove } from '@/shared/lib/infinity-query-optimistic-update';
import type { InfiniteData, QueryKey } from '@tanstack/react-query';

interface MutateContext {
  prevCount?: ContactCountResponse;
  prevContacts: [QueryKey, InfiniteData<ContactInfoResponse> | undefined][];
}

const contactListFilter = {
  queryKey: getGetContactsContactListGetInfiniteQueryKey(),
  exact: false,
};
const countQueryKey = getGetContactCountContactCountGetQueryKey();

export const useContactRemove = () => {
  return useRemoveContactContactRemoveDelete({
    mutation: {
      async onMutate(variables, context) {
        await Promise.all([
          context.client.cancelQueries(contactListFilter),
          context.client.cancelQueries({ queryKey: countQueryKey }),
        ]);

        const prevCount = context.client.getQueryData<ContactCountResponse>(
          countQueryKey
        );
        const prevContacts =
          context.client.getQueriesData<InfiniteData<ContactInfoResponse>>(
            contactListFilter
          );

        context.client.setQueryData(
          countQueryKey,
          (old: ContactCountResponse | undefined) => {
            if (!old) return old;

            return {
              ...old,
              data: { count: Math.max(0, old.data.count - 1) },
            };
          }
        );

        context.client.setQueriesData<InfiniteData<ContactInfoResponse>>(
          contactListFilter,
          (old) => {
            if (!old) return old;

            return infinityQueryOptimisticRemove(
              old,
              (page) => page.data.items,
              (item) => item.user_id === variables.data.user_id
            );
          }
        );

        return { prevCount, prevContacts };
      },
      onError(_error, _variables, onMutateResult, context) {
        if (onMutateResult?.prevCount) {
          context.client.setQueryData(
            countQueryKey,
            onMutateResult.prevCount
          );
        }

        onMutateResult?.prevContacts.forEach(([queryKey, data]) => {
          context.client.setQueryData(queryKey, data);
        });
      },
      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await Promise.all([
          context.client.invalidateQueries(contactListFilter),
          context.client.invalidateQueries({ queryKey: countQueryKey }),
        ]);
      },
    },
  });
};
