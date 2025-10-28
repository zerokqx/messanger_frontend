import { useLogin } from '@/features/login';
import { loginFormSchema } from '@/features/login/model/loginSchema';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Form } from '@/shared/ui/Form';
import { CustomMantinePassword } from '@/shared/ui/Input/ui/CustomMantinePassword';
import { Modal } from '@/shared/ui/Modal';
import { PasswordInput } from '@mantine/core';
import { formOptions } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';

export const LoginModal = () => {
  const close = useModalGlobal.usePinClose()('login');
  const router = useRouter();
  const { mutate } = useLogin();
  const options = formOptions({
    defaultValues: {
      userName: '',
      password: '',
    },
    validators: {
      onChange: loginFormSchema,
    },

    onSubmit: ({ value }) => {
      mutate(
        {
          body: {
            password: value.password,
            login: value.userName,
          },
        },
        {
          onSuccess: () => {
            void router.invalidate();
            close();
          },
        }
      );
    },
  });
  return (
    <Modal keyModal="login">
      <Form
        fieldSet={[
          {
            fieldName: 'Имя пользователя',
            name: 'userName',
            placeholder: 'Имя пользователя',
          },

          {
            fieldName: 'Пароль',
            name: 'password',
            placeholder: 'Пороль',
            component: CustomMantinePassword,
          },
        ]}
        options={options}
        title="Вход в систему"
      />
    </Modal>
  );
};
