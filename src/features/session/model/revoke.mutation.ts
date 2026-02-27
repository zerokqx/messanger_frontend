import { $api } from '@/shared/api/repository/$api';
import Logger from '@/shared/lib/logger/logger';
import type { components } from '@/shared/types/v1';

export const useRevokeSession = () => {
  return $api.jwtAuth.query.useMutation(
    'post',
    '/sessions/revoke/{session_id}',
    {
      async onMutate(variables, context) {
        const sessionsListOptions = $api.jwtAuth.query.queryOptions(
          'get',
          '/sessions/list',
          {}
        );

        await context.client.cancelQueries(sessionsListOptions);

        const previous = context.client.getQueryData<
          components['schemas']['SessionsListResponse']
        >(sessionsListOptions.queryKey);

        Logger.debug(
          'useRevokeSession',
          'previous sessions',
          previous?.data.sessions
        );

        if (previous?.data.sessions) {
          context.client.setQueryData(sessionsListOptions.queryKey, {
            ...previous,
            data: {
              ...previous.data,
              sessions: previous.data.sessions.filter(
                (s) => s.id !== variables.params.path.session_id
              ),
            },
          } as components['schemas']['SessionsListResponse']);
        }

        return { previous };
      },

      onError(_error, _variables, _onMutateResult, context) {
        if (context?.previous) {
          context.client.setQueryData(
            $api.jwtAuth.query.queryOptions('get', '/sessions/list', {})
              .queryKey,
            context.previous
          );
        }
      },

      onSettled(_data, _error, _variables, _onMutateResult, context) {
        void context.client.invalidateQueries(
          $api.jwtAuth.query.queryOptions('get', '/sessions/list', {})
        );
      },
    }
  );
};
