import { useLogin } from '@/features/login';
import { loginFormSchema } from '@/features/login/model/loginSchema';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { useCloseOpen } from '@/shared/model/useModalStore/lib/useCloseOpen';
import { Form } from '@/shared/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import { NotHaveAccount } from '@/shared/ui/NotHaveAccount';
import { Checkbox, Flex, InputLabel, PasswordInput } from '@mantine/core';
import { formOptions } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';

export const LoginModal = () => {
  const close = useModalGlobal.usePinClose()('login');
  const swapMode = useCloseOpen('login', 'register');
  const router = useRouter();
  const { mutate, error } = useLogin();
  const options = formOptions({
    defaultValues: {
      userName: '',
      password: '',
    },
    validators: {
      onChange: loginFormSchema,
    },

    onSubmit: ({ value }) => {
      console.log(value);
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
      console.log('Error:', error); // Есть ли ошибка?
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
            fieldName: 'Запомнить меня',
            name: 'password',
            label: false,
            component: (f, fSet) => (
              <Flex direction={'row'} gap={'md'}>
                <Checkbox/>
                <InputLabel> {fSet.fieldName}</InputLabel>
              </Flex>
            ),
          },
          {
            fieldName: 'Пароль',
            name: 'password',
            placeholder: 'Пароль',
            component: (field, fSet, props) => (
              <PasswordInput {...props} placeholder={fSet.placeholder} />
            ),
          },
        ]}
        buttonLabel="Войти"
        options={options}
        title="Вход в систему"
      />
      <NotHaveAccount onClick={swapMode} />
    </Modal>
  );
};
