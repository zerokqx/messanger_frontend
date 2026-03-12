import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';

export const useSessionRevokeAll = () => {
  return $api.auth.jwt.useMutation(
    'post',
    '/sessions/revoke_all_except_current',
    {
      async onMutate(_, ctx) {
        const queryOptions = $api.auth.jwt.queryOptions(
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
      onError(_error, _variables, onMutateResult, context) {
        context.client.setQueryData(
          $api.auth.jwt.queryOptions('get', '/sessions/list').queryKey,
          onMutateResult.prev
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
