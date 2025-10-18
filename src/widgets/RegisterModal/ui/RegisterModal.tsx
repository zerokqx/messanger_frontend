
import { Form } from '@/shared/ui/Form';
import { formOptions } from '@tanstack/react-form';
import { registerSchema, useRegister } from '@/features/register';
import { Modal } from '@/shared/ui/Modal';
import { useRegisterModal } from '../model/useRegisterModal';

export const RegisterModal = () => {
  const store = useRegisterModal()
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
          mutate({
            body: {
              password: value.password,
              login: value.userName,
              invite: '2025',
            },
          });
        },


  })
  const { mutate } = useRegister();
  return (
    <Modal store={store}>


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
