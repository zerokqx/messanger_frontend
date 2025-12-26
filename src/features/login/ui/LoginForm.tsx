import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { loginFormSchema } from '../model/loginSchema';
import { useLogin } from '../api';
import type { LoginFormProp } from '../types/loginForm.type';
import { FieldGroutpUserNamePassword } from '@/shared/ui/Form/ui/FormV2/Groups/UserNamePassword';
import { useTranslation } from 'react-i18next';
import { ListRestart } from 'lucide-react';

export const LoginForm = ({
  mutateProps,
  onSecondActionClick,
}: LoginFormProp) => {
  const { t } = useTranslation(['titles', 'buttonLabels', 'fieldLabels']);
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
          <form.Title text={t('titles:enter')} />
          <FieldGroutpUserNamePassword
            form={form}
            fields={{
              password: 'password',
              userName: 'userName',
            }}
          />
          <form.Horizontal justify="center">
            <form.SubmitButton children={t('buttonLabels:submit')} />
            <form.ResetButton variant="subtle">
              <ListRestart />
            </form.ResetButton>
          </form.Horizontal>
          <form.Vertical justify="center" w={'100%'}>
            <form.SecondAction
              onClick={onSecondActionClick}
              title={t('fieldLabels:have_account')}
            >
              {t('buttonLabels:create')}
            </form.SecondAction>
          </form.Vertical>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
