import Logger from '@/shared/lib/logger/logger';
import type { SessionsListResponse } from '@/shared/api/orval/auth-service/auth-service.schemas';
import {
  getSessionsListSessionsListGetQueryOptions,
  useRevokeSessionSessionsRevokeSessionIdPost,
} from '@/shared/api/orval/auth-service/v1-auth/v1-auth';

interface MutateContext {
  previous?: SessionsListResponse;
}

export const useRevokeSession = () => {
  return useRevokeSessionSessionsRevokeSessionIdPost({
    mutation: {
    async onMutate(variables, context): Promise<MutateContext> {
      const sessionsListOptions = getSessionsListSessionsListGetQueryOptions();

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
              (s) => s.id !== variables.sessionId
            ),
          },
        } as SessionsListResponse);
      }

      return { previous };
    },

    onError(_error, _variables, _onMutateResult, context) {
      const typedContext = _onMutateResult as MutateContext;
      context.client.setQueryData(
        getSessionsListSessionsListGetQueryOptions().queryKey,
        typedContext.previous
      );
    },

    onSettled(_data, _error, _variables, _onMutateResult, context) {
      void context.client.invalidateQueries(
        getSessionsListSessionsListGetQueryOptions()
      );
    },
    },
  });
};
