import { Form } from '@/shared/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import { formOptions } from '@tanstack/react-form';
import { useChangePasswordModal } from '../model/useChangePasswordModal';
import type { CustomModalProps } from '../types/modal.type';
import { useChangePassword } from '@/features/changePassword';
import { useLogout } from '@/entities/user';

export const ChangePasswordModal = ({ ...props }: CustomModalProps) => {
  const { mutate, isSuccess } = useChangePassword();
  const logout = useLogout();
  const store = useChangePasswordModal();

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
    <Modal {...props} zIndex={501} store={store}>
      {!isSuccess ? (
        <Form
          title="Смена пароля"
          options={options}
          fieldSet={[
            {
              name: 'currentPassword',
              placeholder: 'Текущий пароль',
            },
            {
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
