import { useLogin } from '@/features/login';
import { loginFormSchema } from '@/features/login/model/loginSchema';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { useCloseOpen } from '@/shared/model/useModalStore/lib/useCloseOpen';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { FieldGroutpUserNamePassword } from '@/shared/ui/Form/ui/FormV2/Groups/UserNamePassword';
import { Modal } from '@/shared/ui/Modal';
import { useStore } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { If, Then } from 'react-if';

export const LoginModal = () => {
  const { t } = useTranslation(['titles', 'buttonLabels', 'fieldLabels']);
  const close = useModalGlobal.usePinClose()('login');
  const swapMode = useCloseOpen('login', 'register');
  const router = useRouter();
  const { mutate } = useLogin();
  const form = useAppForm({
    defaultValues: {
      password: '',
      userName: '',
    },
    validators: {
      onMount: loginFormSchema,
      onChange: loginFormSchema,
    },

    onSubmit: ({ value: { password, userName } }) => {
      mutate(
        {
          body: {
            password: password,
            login: userName,
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
  const isDirty = useStore(form.store, (s) => s.isDirty);
  return (
    <Modal keyModal="login">
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
              <If condition={!isDirty}>
                <Then>
                  <form.SecondAction
                    title={t('fieldLabels:have_account')}
                    onClick={swapMode}
                  >
                    {t('buttonLabels:create')}
                  </form.SecondAction>
                </Then>
              </If>
            </form.Vertical>
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </Modal>
  );
};
