import { useMe } from '@/entities/user/model/me.query';
import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import {
  Loader,
  Space,
} from '@mantine/core';
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
  console.log(data);
  const { mutate, isError } = useEditProfile();
  // const [avatar, setAvatar] = useState<File | null>(null);
  const form = useAppForm({
    defaultValues: {
      bio: data.bio,
    },

    onSubmit(props) { mutate(
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
            {/* <FileButton> */}
            {/*   {(props) => <UserProfile.Avatar {...props} />} */}
            {/* </FileButton> */}
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
                    rows={4} description={
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
                    variant="subtle"
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
                    {isError
                      ? t('button-labels:retray')
                      : t('button-labels:save')}
                  </form.DirtyButton>
                )}
              />
            </form.Vertical>
          </form.Form>
        </form.AppForm>
      </UserProfile>
  );
};
