import { $api } from '@/shared/api/repository/$api';

export const useContactAdd = () => {
  const mutate = $api.jwtUser.query.useMutation('post', '/contact/add', {
    async onMutate(variables, context) {
      await Promise.all([
        context.client.cancelQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/list')
        ),

        context.client.cancelQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/count')
        ),
      ]);
    },
    async onSettled(data, error, variables, onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries({
          queryKey: ['get', '/contact/list'],
        }),
        context.client.invalidateQueries({
          queryKey: ['get', '/contact/count'],
        }),
      ]);
    },
  });
  return mutate;
};
