import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { filter } from 'lodash';

export const useRevokeSession = () => {
  return $api.jwtAuth.query.useMutation(
    'post',
    '/sessions/revoke/{session_id}',
    {
      async onMutate(variables, ctx) {
        const sessionsListOption = $api.jwtAuth.query.queryOptions(
          'get',
          '/sessions/list'
        );

        // Отменяем текущие запросы, чтобы избежать race condition
        await ctx.client.cancelQueries(sessionsListOption);

        // Сохраняем предыдущее значение для возможного отката
        const previous = ctx.client.getQueryData<
          components['schemas']['SessionsListResponse']
        >(sessionsListOption.queryKey);

        // Оптимистическое обновление — удаляем сессию из списка
        ctx.client.setQueryData(
          sessionsListOption.queryKey,
          (old?: components['schemas']['SessionsListResponse']) => {
            if (!old?.data.sessions) return old;

            return {
              ...old,
              data: {
                ...old.data,
                sessions: filter(
                  old.data.sessions,
                  (session) => session.id !== variables.params.path.session_id
                ),
              },
            };
          }
        );

        return { previous };
      },

      onError(err, newTodo, onMutateResult, context) {
        if (onMutateResult.previous) {
          ctx.client.setQueryData(
            $api.jwtAuth.query.queryOptions('get', '/sessions/list').queryKey,
            onMutateResult.previous
          );
        }
      },

      async onSettled(data, error, variables, onMutateResult, context) {
        await context.client.invalidateQueries(
          $api.jwtAuth.query.queryOptions('get', '/sessions/list')
        );
      },
    }
  );
};
