import { useMeDescriptor } from '@/entities/user/model/me.query';
import { $api } from '@/shared/api/repository/$api';
import { errorNotify } from '@/shared/lib/notifications/error';
import { successNotify } from '@/shared/lib/notifications/success';
import type { components } from '@/shared/types/v1';
import { useTranslation } from 'react-i18next';

type ProfileResponse = components['schemas']['ProfileResponse'];

export const useEditProfile = (withReset = false) => {
  const [edit] = useMeDescriptor({ autoCommit: true });
  const [t] = useTranslation(['titles', 'profile']);

  return $api.profile.jwt.useMutation('put', '/edit', {
    async onMutate(variables, ctx) {
      const profileQueryOptions = $api.profile.jwt.queryOptions(
        'get',
        '/me',
        {}
      );

      await ctx.client.cancelQueries(profileQueryOptions);

      const prev = ctx.client.getQueryData<ProfileResponse>(
        profileQueryOptions.queryKey
      );

      edit((draft) => {
        Object.assign(draft.data, variables.body);
      });

      return { prev };
    },

    onError(_error, _variables, _onMutateResult, context) {
      errorNotify(t('profile:put_profile_error'), t('error'));

      if (withReset) {
        void context.client.invalidateQueries(
          $api.profile.jwt.queryOptions('get', '/me', {})
        );
      }
    },

    onSuccess() {
      successNotify(t('profile:put_success'), t('success'));
    },

    onSettled(_data, _error, _variables, _onMutateResult, context) {
      void context.client.invalidateQueries(
        $api.profile.jwt.queryOptions('get', '/me', {})
      );
    },
  });
};
