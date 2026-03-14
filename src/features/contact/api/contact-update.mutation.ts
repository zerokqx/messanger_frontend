import { makeGetUserById } from '@/entities/user';
import { $api } from '@/shared/api/repository/$api';
import { notify } from '@/shared/lib/notifications';
import type { components } from '@/shared/types/v1';
import { useTranslation } from 'react-i18next';

type Profile = components['schemas']['ProfileByUserIdData'];
interface MutateContext {
  prevGetById?: Profile;
}
export const useContactUpdate = () => {
  const { t } = useTranslation(['api-errors']);
  return $api.user.jwt.useMutation('patch', '/contact/update', {
    async onMutate({ body }, context): Promise<MutateContext> {
      const getUserByIdOpt = makeGetUserById(body.user_id);
      await Promise.all([
        context.client.cancelQueries(getUserByIdOpt),
        context.client.cancelQueries({
          queryKey: ['get', '/user/search'],
        }),
      ]);
      const prevGetById = context.client.getQueryData<Profile>(
        getUserByIdOpt.queryKey
      );

      context.client.setQueryData<Profile>(getUserByIdOpt.queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          custom_name: body.custom_name,
        } satisfies Profile;
      });
      return { prevGetById };
    },
    onError(_error, variables, onMutateResult, context) {
      const typedMutateResult = onMutateResult as MutateContext;
      if (typedMutateResult.prevGetById) {
        context.client.setQueryData<Profile>(
          makeGetUserById(variables.body.user_id).queryKey,
          typedMutateResult.prevGetById
        );
      }
      notify.error({ message: t('api-errors:contact_update') });
    },
    async onSettled(_data, _error, variables, _onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries(
          makeGetUserById(variables.body.user_id)
        ),
        context.client.invalidateQueries({
          queryKey: ['get', '/user/search'],
        }),
      ]);
    },
  });
};
