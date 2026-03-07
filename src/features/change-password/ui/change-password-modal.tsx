import {
  Button,
  Modal,
  PasswordInput,
  Stack,
  type ModalProps,
} from '@mantine/core';
import { usePasswordChange } from '../api';
import { useTails } from '@/shared/lib/tails';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { notify } from '@/shared/lib/notifications';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';
import { Check, Save } from 'lucide-react';

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}
export const ChangePasswordModal = ({
  opened,
  ...props
}: Omit<ModalProps, 'title'>) => {
  const {
    mutateAsync: passwordChange,
    isSuccess,

    isPending,
  } = usePasswordChange();
  const [t] = useTranslation('password-change');
  const tailIsSuccess = useTails(1000, isSuccess);

  const { register, reset, handleSubmit, formState } =
    useForm<ChangePasswordForm>();
  const { current: passwordIdLoading } = useRef('loading-1');
  const submit: SubmitHandler<ChangePasswordForm> = async ({
    newPassword,
    oldPassword,
  }) => {
    notify.loading({
      title: t('notification-loading-title'),
      id: passwordIdLoading,
    });
    await passwordChange(
      {
        body: {
          old_password: oldPassword,
          new_password: newPassword,
        },
      },
      {
        onSuccess: () => {
          notify.success({ message: t('notification-success-message') });
        },
        onError: () => {
          notify.error();
        },
        onSettled: () => {
          notifications.hide(passwordIdLoading);
        },
      }
    );
  };
  return (
    <Modal
      {...props}
      title={t('modal-title')}
      opened={opened}
      onClose={() => {
        reset();
        props.onClose();
      }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Stack>
          <PasswordInput
            data-autofocus
            label={t('old-password')}
            {...register('oldPassword')}
          />
          <PasswordInput
            label={t('new-password')}
            {...register('newPassword')}
          />
          <Button
            disabled={isPending}
            variant={'subtle'}
            type="submit"
            leftSection={tailIsSuccess ? <Check /> : <Save />}
            color={tailIsSuccess ? 'green' : undefined}
            loading={formState.isSubmitting}
          >
            {tailIsSuccess ? t('button-changed') : t('button-change')}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
