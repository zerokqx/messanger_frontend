import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';

export const useSessionRevokeAll = () => {
  return $api.jwtAuth.query.useMutation(
    'post',
    '/sessions/revoke_all_except_current',
    {
      async onMutate(_, ctx) {
        const queryOptions = $api.jwtAuth.query.queryOptions(
          'get',
          '/sessions/list'
        );
        await ctx.client.cancelQueries(queryOptions);
        const prev = ctx.client.getQueryData<
          components['schemas']['SessionsListResponse']
        >(queryOptions.queryKey);
        const currentSession = prev?.data.sessions.find((s) => s.is_current);
        ctx.client.setQueryData(
          queryOptions.queryKey,
          (old: components['schemas']['SessionsListResponse']) => {
            return { ...old, data: [currentSession] };
          }
        );
        return { prev };
      },
      onError(error, variables, onMutateResult, context) {
        context.client.setQueryData(
          $api.jwtAuth.query.queryOptions('get', '/sessions/list').queryKey,
          onMutateResult.prev
        );
      },

      async onSettled(data, error, variables, onMutateResult, context) {
        await context.client.invalidateQueries(
          $api.jwtAuth.query.queryOptions('get', '/sessions/list')
        );
      },
    }
  );
};
