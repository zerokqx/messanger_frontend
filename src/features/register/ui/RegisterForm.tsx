import { Form } from '@/shared/ui/Form';
import { registerSchema } from '../models/registerSchema';
import { useRegister } from '../api';
import { formOptions } from '@tanstack/react-form';

export const RegisterForm = () => {
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
  );
};
