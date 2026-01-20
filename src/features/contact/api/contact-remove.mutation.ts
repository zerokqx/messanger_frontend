import { $api } from '@/shared/api/repository/$api';

export const useContactRemove = () => {
  return $api.jwtUser.query.useMutation('delete', '/contact/remove', {
    async onMutate(_variables, context) {
      await Promise.all([
        context.client.cancelQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/list')
        ),

        context.client.cancelQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/count')
        ),
      ]);
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/list')
        ),

        context.client.invalidateQueries(
          $api.jwtUser.query.queryOptions('get', '/contact/count')
        ),
      ]);
    },
  });
};
