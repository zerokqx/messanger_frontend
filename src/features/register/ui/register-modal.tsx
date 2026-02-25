import { registerSchema, useRegister } from '@/features/register';
import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { FieldGroutpUserNamePassword } from '@/shared/ui/form/ui/form-v2/groups/user-name-password';
import { Modal, type ModalProps } from '@mantine/core';
import { ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export const RegisterModal = ({children,...props}: ModalProps) => {
  const { t } = useTranslation(['button-labels', 'field-labels', 'auth']);
  const { mutate } = useRegister();
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
          onSuccess: props.onClose,
        }
      );
    },
  });

  return (
    <Modal {...props}>
      <form.AppForm>
        <form.Form>
          <form.Vertical>
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
          </form.Vertical>
        </form.Form>
      </form.AppForm>
      {children}
    </Modal>
  );
};
