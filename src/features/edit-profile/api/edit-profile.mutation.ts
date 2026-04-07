import { meQueryKey, meQueryOptions, useMeDescriptor } from '@/entities/viewer';
import { errorNotify } from '@/shared/lib/notifications/error';
import { successNotify } from '@/shared/lib/notifications/success';
import { useEditProfileEditPut } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import type { ProfileResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { useTranslation } from 'react-i18next';

export const useEditProfile = (withReset = false) => {
  const [edit] = useMeDescriptor({ autoCommit: true });
  const [t] = useTranslation(['titles', 'profile']);

  return useEditProfileEditPut({
    mutation: {
      async onMutate(variables, ctx) {
        await ctx.client.cancelQueries(meQueryOptions);

        const prev = ctx.client.getQueryData<ProfileResponse>(
          meQueryKey
        );

        edit((draft) => {
          Object.assign(draft, variables.data);
        });

        return { prev };
      },

      onError(_error, _variables, _onMutateResult, context) {
        errorNotify(t('profile:put_profile_error'), t('error'));

        if (withReset) {
          void context.client.invalidateQueries({
            queryKey: meQueryKey,
          });
        }
      },

      onSuccess() {
        successNotify(t('profile:put_success'), t('success'));
      },

      onSettled(_data, _error, _variables, _onMutateResult, context) {
        void context.client.invalidateQueries({
          queryKey: meQueryKey,
        });
      },
    },
  });
};
