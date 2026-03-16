import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';

interface MutateContext {
  previous?: components['schemas']['SessionsListResponse'];
}

export const useSessionRevokeAll = () => {
  return $api.auth.jwt.useMutation(
    'post',
    '/sessions/revoke_all_except_current',
    {
      async onMutate(_, ctx): Promise<MutateContext> {
        const queryOptions = $api.auth.jwt.queryOptions(
          'get',
          '/sessions/list'
        );
        await ctx.client.cancelQueries(queryOptions);
        const previous = ctx.client.getQueryData<MutateContext['previous']>(
          queryOptions.queryKey
        );
        const currentSession = previous?.data.sessions.find(
          (s) => s.is_current
        );
        ctx.client.setQueryData(
          queryOptions.queryKey,
          (old: components['schemas']['SessionsListResponse']) => {
            return { ...old, data: [currentSession] };
          }
        );
        return { previous };
      },
      onError(_error, _variables, onMutateResult, context) {
        const typedMutateContext = onMutateResult as MutateContext;
        context.client.setQueryData(
          $api.auth.jwt.queryOptions('get', '/sessions/list').queryKey,
          typedMutateContext.previous
        );
      },

      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await context.client.invalidateQueries(
          $api.auth.jwt.queryOptions('get', '/sessions/list')
        );
      },
    }
  );
};
