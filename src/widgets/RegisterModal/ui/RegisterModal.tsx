import { registerSchema, useRegister } from '@/features/register';
import { useCloseOpen } from '@/shared/model/useModalStore/lib/useCloseOpen';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { FieldGroutpUserNamePassword } from '@/shared/ui/Form/ui/FormV2/Groups/UserNamePassword';
import { Modal } from '@/shared/ui/Modal';
import { useStore } from '@tanstack/react-form';
import { ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { If, Then } from 'react-if';

export const RegisterModal = () => {
  const { t } = useTranslation(['buttonLabels', 'fieldLabels', 'titles']);
  const { mutate } = useRegister();
  const swapMode = useCloseOpen('register', 'login');
  const form = useAppForm({
    defaultValues: { userName: '', password: '', confirmPassword: '' },
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
          onSuccess: swapMode,
        }
      );
    },
  });

  const isDirty = useStore(form.store, (s) => s.isDirty);
  return (
    <Modal keyModal="register">
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.Title text={t('titles:register')} />
            <FieldGroutpUserNamePassword
              form={form}
              fields={{
                password: 'password',
                userName: 'userName',
              }}
            />
            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.PasswordInput
                  label={t('fieldLabels:password_repeat_label')}
                />
              )}
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
                    {t('buttonLabels:enter')}
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
