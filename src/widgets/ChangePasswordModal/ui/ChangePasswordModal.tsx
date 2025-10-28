import { useLogout } from '@/entities/user';
import { useChangePassword } from '@/features/changePassword';
import { Form } from '@/shared/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import { formOptions } from '@tanstack/react-form';
import type { CustomModalProps } from '../types/modal.type';
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
        { onSuccess: () => logout() }
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
            },
            {
              fieldName: 'Повторите пороль',
              label: true,
              name: 'newPassword',
              placeholder: 'Новый пороль',
            },
          ]}
        />
      ) : (
        <p>Okey</p>
      )}
    </Modal>
  );
};
