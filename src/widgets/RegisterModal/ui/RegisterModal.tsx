import { Form } from '@/shared/ui/Form';
import { formOptions } from '@tanstack/react-form';
import { registerSchema, useRegister } from '@/features/register';
import { Modal } from '@/shared/ui/Modal';
import { useRegisterModal } from '../model/useRegisterModal';
import { useLoginModal } from '@/widgets/LoginModal';

export const RegisterModal = () => {
  const store = useRegisterModal();
  const login = useLoginModal();
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
            store.close();
            login.open();
          },
        }
      );
    },
  });
  const { mutate } = useRegister();
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
