import { $api } from '@/shared/api/repository/$api';
import Logger from '@/shared/lib/logger/logger';
import type { components } from '@/shared/types/v1';

interface MutateContext {
  previous?: components['schemas']['SessionsListResponse'];
}

export const useRevokeSession = () => {
  return $api.auth.jwt.useMutation('post', '/sessions/revoke/{session_id}', {
    async onMutate(variables, context): Promise<MutateContext> {
      const sessionsListOptions = $api.auth.jwt.queryOptions(
        'get',
        '/sessions/list',
        {}
      );

      await context.client.cancelQueries(sessionsListOptions);

      const previous = context.client.getQueryData<MutateContext['previous']>(
        sessionsListOptions.queryKey
      );

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
      const typedContext = _onMutateResult as MutateContext;
      context.client.setQueryData(
        $api.auth.jwt.queryOptions('get', '/sessions/list', {}).queryKey,
        typedContext.previous
      );
    },

    onSettled(_data, _error, _variables, _onMutateResult, context) {
      void context.client.invalidateQueries(
        $api.auth.jwt.queryOptions('get', '/sessions/list', {})
      );
    },
  });
};
