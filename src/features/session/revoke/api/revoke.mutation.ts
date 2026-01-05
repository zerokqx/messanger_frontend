import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { filter, map } from 'lodash';

export const useRevokeSession = () => {
  return $api.jwtAuth.query.useMutation(
    'post',
    '/sessions/revoke/{session_id}',
    {
      async onMutate(revokeSession, ctx) {
        const sessionsListOption = $api.jwtAuth.query.queryOptions(
          'get',
          '/sessions/list'
        );
        await ctx.client.cancelQueries(sessionsListOption);
        const prev = ctx.client.getQueryData<
          components['schemas']['SessionsListResponse']
        >(sessionsListOption.queryKey);
        ctx.client.setQueryData(
          sessionsListOption.queryKey,
          (old: components['schemas']['SessionsListResponse']) => {
            return filter(
              old.data.sessions,
              (session) => session.id !== revokeSession.params.path.session_id
            );
          }
        );

        return { prev };
      },
    }
  );
};
