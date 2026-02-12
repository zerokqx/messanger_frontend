import { useEditProfile } from '@/features/edit-profile';
import { useMe } from '@/entities/user/model/me.query';
import { useTranslation } from 'react-i18next';
import { useTabSidebar } from '@/widgets/side-bar/model/tab';
import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { Loader, Space } from '@mantine/core';

export const ProfileEditTab = () => {
  const { t } = useTranslation(['sideBar', 'fieldLabels', 'buttonLabels']);
  const { data } = useMe();
  const { mutate, isError } = useEditProfile();
  const goBack = useTabSidebar.useGoBack();
  const form = useAppForm({
    defaultValues: {
      bio: data?.bio,
    },

    onSubmit(props) {
      mutate(
        {
          body: {
            bio: props.value.bio,
          },
        },
        {
          onSuccess() {
            goBack();
            form.reset();
          },
        }
      );
    },
  });

  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <form.AppField
            name="bio"
            children={(field) => (
              <field.TextArea rows={4} label={t('fieldLabels:bio_label')} />
            )}
          />
          <form.Subscribe
            selector={(state) => [state.isSubmitted]}
            children={([isSubmited]) => (
              <form.DirtyButton
                color={isError ? 'red' : 'blue'}
                disabled={isSubmited}
                type="submit"
              >
                {isSubmited && (
                  <>
                    <Loader size={16} />
                    <Space w={'1rem'} />
                  </>
                )}
                {isError ? t('buttonLabels:retray') : t('buttonLabels:save')}
              </form.DirtyButton>
            )}
          />
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
