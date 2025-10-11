import { Form } from '@/shared/ui/Form';
import { registerSchema } from '../models/registerSchema';
import { useRegister } from '@/entities/user';
import { useSearch } from '@tanstack/react-router';

export const RegisterForm = () => {
  const search = useSearch({
    from: '/auth',
  });
  const { mutate } = useRegister(search);
  return (
    <Form
      title="Регистрация"
      options={{
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
              // BUG: Any type.
              password: value.password,
              login: value.userName,
            },
          });
        },
      }}
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
  );
};
