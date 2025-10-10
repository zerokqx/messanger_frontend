// WARN: Global contexts form

import { useLogin } from '@/entities/user';
import { useSearch } from '@tanstack/react-router';
import { loginFormSchema } from '../model/loginSchema';
import { Form } from '@/shared/ui/Form';

export const LoginForm = () => {
  const search = useSearch({
    from: '/auth',
  });
  const { mutate } = useLogin(search);

  return (
    <Form
      fieldSet={[
        {
          name: 'userName',
          placeholder: 'Имя пользователя',
        },

        {
          name: 'password',
          placeholder: 'Пороль',
        },
      ]}
      options={{
        defaultValues: {
          userName: '',
          password: '',
        },
        validators: {
          onChange: loginFormSchema,
        },

        onSubmit: async ({ value }) => {
          mutate({
            body: {
              password: value.password,
              login: value.userName,
            },
          });
        },
      }}
      title="Вход в систему"
    />
  );
};
