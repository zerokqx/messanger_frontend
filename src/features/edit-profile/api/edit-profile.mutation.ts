import { $api } from '@/shared/api/repository/$api';
import { errorNotify } from '@/shared/lib/notifications/error';
import { successNotify } from '@/shared/lib/notifications/success';
import type { components } from '@/shared/types/v1';
import { useTranslation } from 'react-i18next';

export const useEditProfile = (withReset = false) => {
  const [t] = useTranslation(['titles', 'profile']);
  return $api.jwtProfile.query.useMutation('put', '/edit', {
    async onMutate(variables, ctx) {
      const profileQueryOptions = $api.jwtProfile.query.queryOptions(
        'get',
        '/me',
        {}
      );

      await ctx.client.cancelQueries(profileQueryOptions);
      const prev = ctx.client.getQueryData<
        components['schemas']['ProfileResponse']
      >(profileQueryOptions.queryKey);
      ctx.client.setQueryData(
        profileQueryOptions.queryKey,
        (old?: components['schemas']['ProfileResponse']) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              ...variables.body,
            },
          };
        }
      );
      return { prev };
    },
    onError(error, variables, onMutateResult, context) {
      errorNotify(t('profile:put_profile_error'), t('error'));
      if (withReset) {
        context.client.setQueryData(
          $api.jwtProfile.query.queryOptions('get', '/me', {}).queryKey,

          () => onMutateResult.prev
        );
      }
    },
    onSuccess() {
      successNotify(t('profile:put_success'), t('success'));
    },
    onSettled(data, error, variables, onMutateResult, context) {
      void context.client.invalidateQueries(
        $api.jwtProfile.query.queryOptions('get', '/me', {})
      );
    },
  });
};
