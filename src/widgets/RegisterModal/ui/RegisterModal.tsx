import { registerSchema, useRegister } from '@/features/register';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { Form } from '@/shared/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import { formOptions } from '@tanstack/react-form';

export const RegisterModal = () => {
  const { mutate } = useRegister();
  const registerClose = useModalGlobal.usePinClose()('register');
  const loginOpen = useModalGlobal.usePinOpen()('login');
  const options = formOptions({
    defaultValues: {
      userName: '',
      password: '',
      confirmPassword: '',
    },
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
          onSuccess: () => {
            registerClose();
            loginOpen();
          },
        }
      );
    },
  });
  return (
    <Modal keyModal="register">
      <Form
        title="Регистрация"
        options={options}
        fieldSet={[
          {
            name: 'userName',
            placeholder: 'Имя пользователя',
          },
          {
            name: 'password',
            placeholder: 'Пороль',
          },
          {
            name: 'confirmPassword',
            placeholder: 'Повторите пороль',
          },
        ]}
      />
    </Modal>
  );
};
