import { registerSchema, useRegister } from '@/features/register';
import { useCloseOpen } from '@/shared/model/use-modal-store/lib/use-close-open';
import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { FieldGroutpUserNamePassword } from '@/shared/ui/form/ui/form-v2/groups/user-name-password';
import { Modal } from '@/shared/ui/modal';
import { useStore } from '@tanstack/react-form';
import { ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RegisterModal = () => {
  const { t } = useTranslation(['button-labels', 'field-labels', 'auth']);
  const { mutate } = useRegister();
  const swapMode = useCloseOpen('register', 'login');
  const form = useAppForm({
    defaultValues: { userName: '', password: '', confirmPassword: '' },
    validators: {
      onChange: registerSchema,
    },
    onSubmit({ value }) {
      mutate(
        {
          body: {
            password: value.password,
            login: value.userName,
            invite: '2025',
          },
        },
        {
          onSuccess: swapMode,
        }
      );
    },
  });

  const isDirty = useStore(form.store, (s) => s.isDirty);
  return (
    <Modal keyModal="register">
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.Title text={t('auth:register')} />
            <FieldGroutpUserNamePassword
              form={form}
              fields={{
                password: 'password',
                userName: 'userName',
              }}
            />
            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.PasswordInput
                  label={t('field-labels:password_repeat_label')}
                />
              )}
            />
            <form.Horizontal justify="center">
              <form.SubmitButton children={t('button-labels:submit')} />
              <form.ResetButton variant="subtle">
                <ListRestart />
              </form.ResetButton>
            </form.Horizontal>
            <form.Vertical justify="center" w={'100%'}>
              {!isDirty && (
                <form.SecondAction
                  title={t('auth:have_account')}
                  onClick={swapMode}
                >
                  {t('button-labels:enter')}
                </form.SecondAction>
              )}
            </form.Vertical>
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </Modal>
  );
};
