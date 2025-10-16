import { useSearch } from '@tanstack/react-router';
import { loginFormSchema } from '../model/loginSchema';
import { Form } from '@/shared/ui/Form';
import { formOptions } from '@tanstack/react-form';
import { useLogin } from '../api';

export const LoginForm = () => {
  const search = useSearch({
    from: '/auth',
  });
  const { mutate } = useLogin(search);

  const options = formOptions({
    defaultValues: {
      userName: '',
      password: '',
    },
    validators: {
      onChange: loginFormSchema,
    },

    onSubmit: ({ value }) => {
      mutate({
        body: {
          password: value.password,
          login: value.userName,
        },
      });
    },
  });
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
      // BUG: Not corrects type
      options={options}
      title="Вход в систему"
    />
  );
};
