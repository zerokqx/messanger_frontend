import { $api } from '@/shared/api/repository/$api';

export const useContactRemove = () => {
  return $api.user.jwt.useMutation('delete', '/contact/remove', {
    async onMutate(_variables, context) {
      await Promise.all([
        context.client.cancelQueries(
          $api.user.jwt.queryOptions('get', '/contact/list')
        ),

        context.client.cancelQueries(
          $api.user.jwt.queryOptions('get', '/contact/count')
        ),
      ]);
    },
    async onSettled(_data, _error, _variables, _onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries(
          $api.user.jwt.queryOptions('get', '/contact/list')
        ),

        context.client.invalidateQueries(
          $api.user.jwt.queryOptions('get', '/contact/count')
        ),
      ]);
    },
  });
};
