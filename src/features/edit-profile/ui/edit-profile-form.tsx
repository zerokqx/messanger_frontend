import { useMe } from '@/entities/user/model/me.query';
import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { useTranslation } from 'react-i18next';
import { useEditProfile } from '../api';
import { useOs } from '@/shared/lib/use-os';
import { UserProfile } from '@/entities/user/ui';

interface ProfileEditFormProps {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}

export const ProfileEditForm = ({
  onSuccess,
  onError,
}: ProfileEditFormProps) => {
  const { t } = useTranslation(['field-labels', 'button-labels']);
  const osType = useOs();
  const { data } = useMe();
  const { mutate, isPending } = useEditProfile();
  const form = useAppForm({
    defaultValues: {
      bio: data.bio,
    },

    onSubmit(props) {
      mutate(
        {
          body: {
            bio: props.value.bio,
          },
        },
        {
          onError,
          onSuccess() {
            onSuccess?.();
            form.reset();
          },
        }
      );
    },
  });

  return (
    <UserProfile profile={data}>
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.AppField
              name="bio"
              children={(field) => (
                <field.TextArea
                  onKeyDown={(e) => {
                    if (!osType.isDesktop) return;
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void form.handleSubmit();
                    }
                  }}
                  rows={4}
                  description={
                    osType.isDesktop && (
                      <>
                        Enter - Отправить <br />
                        Shift + Enter — Перенос строки
                      </>
                    )
                  }
                  label={t('field-labels:bio_label')}
                />
              )}
            />
            <form.Subscribe
              selector={(state) => [state.isSubmitted]}
              children={([isSubmited]) => (
                <form.DirtyButton
                  variant={isPending ? 'light' : 'subtle'}
                  loading={isSubmited}
                  disabled={isSubmited}
                  type="submit"
                >
                  {t('button-labels:save')}
                </form.DirtyButton>
              )}
            />
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </UserProfile>
  );
};
