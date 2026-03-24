import type { SessionsListResponse } from '@/shared/api/orval/auth-service/auth-service.schemas';
import {
  getSessionsListSessionsListGetQueryOptions,
  useRevokeAllExceptCurrentSessionsRevokeAllExceptCurrentPost,
} from '@/shared/api/orval/auth-service/v1-auth/v1-auth';

interface MutateContext {
  previous?: SessionsListResponse;
}

export const useSessionRevokeAll = () => {
  return useRevokeAllExceptCurrentSessionsRevokeAllExceptCurrentPost({
    mutation: {
      async onMutate(_, ctx): Promise<MutateContext> {
        const queryOptions = getSessionsListSessionsListGetQueryOptions();
        await ctx.client.cancelQueries(queryOptions);
        const previous = ctx.client.getQueryData<MutateContext['previous']>(
          queryOptions.queryKey
        );
        const currentSession = previous?.data.sessions.find(
          (s) => s.is_current
        );
        ctx.client.setQueryData(
          queryOptions.queryKey,
          (old: SessionsListResponse | undefined) => {
            if (!old) return old;

            return {
              ...old,
              data: {
                ...old.data,
                sessions: currentSession ? [currentSession] : [],
              },
            };
          }
        );
        return { previous };
      },
      onError(_error, _variables, onMutateResult, context) {
        const typedMutateContext = onMutateResult as MutateContext;
        context.client.setQueryData(
          getSessionsListSessionsListGetQueryOptions().queryKey,
          typedMutateContext.previous
        );
      },

      async onSettled(_data, _error, _variables, _onMutateResult, context) {
        await context.client.invalidateQueries(
          getSessionsListSessionsListGetQueryOptions()
        );
      },
    },
  });
};
