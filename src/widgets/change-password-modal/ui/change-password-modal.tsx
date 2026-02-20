import { useLogout } from '@/entities/user';
import { useChangePassword } from '@/features/change-password';
import { Form } from '@/shared/ui/form';
import { Modal } from '@/shared/ui/modal';
import { formOptions } from '@tanstack/react-form';
import type { CustomModalProps } from './types';
import { PasswordInput } from '@mantine/core';

export const ChangePasswordModal = ({ ...props }: CustomModalProps) => {
  const logout = useLogout();
  const { mutate, isSuccess } = useChangePassword();
  const options = formOptions({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    onSubmit: ({ value }) => {
      mutate(
        {
          body: {
            new_password: value.newPassword,
            old_password: value.currentPassword,
          },
        },
        {
          onSuccess: () => {
            logout();
          },
        }
      );
    },
  });
  return (
    <Modal {...props} zIndex={501} keyModal={'password'}>
      {!isSuccess ? (
        <Form
          buttonLabel="Сменить пароль"
          title="Смена пароля"
          options={options}
          fieldSet={[
            {
              fieldName: 'Текущий пороль',
              label: true,
              name: 'currentPassword',
              placeholder: 'Текущий пароль',

              component: (field, fSet, props) => (
                <PasswordInput {...props} placeholder={fSet.placeholder} />
              ),
            },
            {
              fieldName: 'Повторите пороль',
              label: true,
              name: 'newPassword',
              placeholder: 'Новый пороль',

              component: (field, fSet, props) => (
                <PasswordInput {...props} placeholder={fSet.placeholder} />
              ),
            },
          ]}
        />
      ) : (
        <p>Okey</p>
      )}
    </Modal>
  );
};
