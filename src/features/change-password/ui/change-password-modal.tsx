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
import { Check, Save } from 'lucide-react';
import {
  createChangePasswordValidation,
  type PasswordsSchema,
} from '../model/change-password-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';

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
  const validationSchema = useMemo(
    () => createChangePasswordValidation(t('passwords-must-differ')),
    [t]
  );

  const { register, reset, handleSubmit, formState } = useForm<PasswordsSchema>(
    { resolver: zodResolver(validationSchema) }
  );
  const loadingNotificationId = 'password-change';
  const submit: SubmitHandler<PasswordsSchema> = async ({
    newPassword,
    oldPassword,
  }) => {
    notify.loading({
      title: t('notification-loading-title'),
      id: loadingNotificationId,
    });
    await passwordChange(
      {
        data: {
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
          notifications.hide(loadingNotificationId);
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
            error={formState.errors.oldPassword?.message}
            data-autofocus
            label={t('old-password')}
            {...register('oldPassword')}
          />
          <PasswordInput
            error={formState.errors.newPassword?.message}
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
