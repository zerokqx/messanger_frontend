import { registerSchema, useRegister } from '@/features/register';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { Form } from '@/shared/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import { PasswordInput } from '@mantine/core';
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
        buttonLabel="Зарегистрироватся"
        fieldSet={[
          {
            fieldName: 'Имя пользователя',
            label: true,
            name: 'userName',
            placeholder: 'Имя пользователя',
          },
          {
            fieldName: 'Пароль',
            label: true,
            name: 'password',
            placeholder: 'Пороль',

            component(field, fSet, props) {
              return (
                <PasswordInput placeholder={fSet.placeholder} {...props} />
              );
            },
          },

          {
            fieldName: 'Повторите пороль',
            label: true,
            name: 'confirmPassword',
            placeholder: 'Повторите пороль',
            component(field, fSet) {
              return (
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder={fSet.placeholder}
                />
              );
            },
          },
        ]}
      />
    </Modal>
  );
};
