import { useProfilePut } from '@/features/profilePut';
import { useAuth } from '@/shared/model/authProviderContext';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { SideBarTaber, useTabSidebar } from '../../model/tab';

export const ProfileEdit = () => {
  const { t } = useTranslation(['sideBar', 'fieldLabels', 'buttonLabels']);
  const bio = useAuth((s) => s.user.bio);
  const { mutate } = useProfilePut();
  const { user } = useAuth();
  const goBack = useTabSidebar.useGoBack();
  const form = useAppForm({
    defaultValues: {
      bio,
    },
    onSubmit(props) {
      mutate(
        {
          body: {
            bio: props.value.bio,
          },
        },
        {
          onSuccess(_, { body: { bio } }) {
            if (bio != null) user.setBio(bio);
            notifications.show({
              message: 'Профиль изменен',
            });

            goBack();
          },
        }
      );
    },
  });

  return (
    <SideBarTaber.Panel value="profile_edit">
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.AppField
              name="bio"
              children={(field) => (
                <field.TextArea rows={4} label={t('fieldLabels:bio_label')} />
              )}
            />
            <form.DirtyButton type="submit" children={t('buttonLabels:save')} />
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </SideBarTaber.Panel>
  );
};
