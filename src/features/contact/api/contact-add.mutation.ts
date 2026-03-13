import { $api } from '@/shared/api/repository/$api';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import type { components } from '@/shared/types/v1';
import type { InfiniteData } from '@tanstack/react-query';

type Count = components['schemas']['ContactCountResponse'];
type ContactResponse = components['schemas']['ContactInfoResponse'];

interface MutateContext {
  prevCount?: Count;
}

const contactListFilter = {
  queryKey: ['get', '/contact/list'] as const,
  exact: false,
};
const countOptions = $api.user.jwt.queryOptions('get', '/contact/count', {});

export const useContactAdd = () => {
  const mutate = $api.user.jwt.useMutation('post', '/contact/add', {
    async onMutate(_variables, context): Promise<MutateContext> {
      await Promise.all([
        context.client.cancelQueries(contactListFilter),
        context.client.cancelQueries(countOptions),
      ]);

      const prevCount = context.client.getQueryData<Count>(
        countOptions.queryKey
      );

      context.client.setQueryData(
        countOptions.queryKey,
        (old: Count | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: { count: old.data.count + 1 },
          };
        }
      );

      return { prevCount };
    },
    onError(_error, _variables, onMutateResult, context) {
      const typedResult = onMutateResult as MutateContext | undefined;
      if (typedResult?.prevCount) {
        context.client.setQueryData(
          countOptions.queryKey,
          typedResult.prevCount
        );
      }
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      const contact = _data?.data;
      if (contact) {
        context.client.setQueriesData<InfiniteData<ContactResponse>>(
          contactListFilter,
          (old) => {
            if (!old) return old;

            const exists = old.pages.some((page) =>
              page.data.items.some((item) => item.user_id === contact.user_id)
            );

            if (exists) return old;

            return infinityQueryOptimisticInsert(
              old,
              (page) => page.data.items,
              contact
            );
          }
        );
      }

      await Promise.all([
        context.client.invalidateQueries(contactListFilter),
        context.client.invalidateQueries(countOptions),
      ]);
    },
  });
  return mutate;
};
