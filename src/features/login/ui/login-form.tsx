import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { loginFormSchema } from '../model/login-schema';
import { useLogin } from '../api';
import type { LoginFormProp } from './types';
import { FieldGroutpUserNamePassword } from '@/shared/ui/form/ui/form-v2/groups/user-name-password';
import { useTranslation } from 'react-i18next'; import { ListRestart } from 'lucide-react';
export const LoginForm = ({
  mutateProps,
}: LoginFormProp) => {
  const { t } = useTranslation(['auth', 'button-labels', 'field-labels']);
  const { mutateAsync } = useLogin();
  const form = useAppForm({
    defaultValues: {
      password: '',
      userName: '',
    },
    validators: {
      onMount: loginFormSchema,
      onChange: loginFormSchema,
    },

    onSubmit: async ({ value: { password, userName } }) => {
      await mutateAsync(
        {
          body: {
            password: password,
            login: userName,
          },
        },

        mutateProps
      );
    },
  });
  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <FieldGroutpUserNamePassword
            form={form}
            fields={{
              password: 'password',
              userName: 'userName',
            }}
          />
          <form.Horizontal justify="center">
            <form.SubmitButton children={t('button-labels:submit')} />
            <form.ResetButton variant="subtle">
              <ListRestart />
            </form.ResetButton>
          </form.Horizontal>
          <form.Vertical justify="center" w={'100%'}>
          </form.Vertical>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
