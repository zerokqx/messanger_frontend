import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
  type ModalProps,
} from '@mantine/core';
import { useCallback } from 'react';
import { notify } from '@/shared/lib/notifications';
import { loginFormSchema } from '../model/login-schema';
import { useLogin } from '../api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimerReset } from 'lucide-react';

interface LoginFormState {
  password: string;
  userName: string;
}

export const LoginModal = ({ children, ...props }: ModalProps) => {
  const { t } = useTranslation(['auth', 'button-labels', 'field-labels']);
  const router = useRouter();
  const { mutateAsync } = useLogin();
  const { reset, formState, handleSubmit, register } = useForm<LoginFormState>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const handleError = useCallback(() => {
    notify.error({
      title: t('auth:invalid_login'),
      message: t('auth:invalid_message_login'),
    });
  }, [t]);

  const handleSuccess = useCallback(() => {
    void router.invalidate();
    props.onClose();
  }, [router, props.onClose]);

  const submit: SubmitHandler<LoginFormState> = async (
    { password, userName },
    e
  ) => {
    e?.preventDefault();
    await mutateAsync(
      {
        body: {
          password,
          login: userName,
        },
      },
      { onSuccess: handleSuccess, onError: handleError }
    );
  };

  return (
    <Modal {...props}>
      <form
        onSubmit={(e) => {
          void handleSubmit(submit)(e);
        }}
      >
        <Stack justify="center" mih="100%">
          <TextInput
            error={formState.errors.userName?.message}
            label={t('field-labels:userName_label')}
            {...register('userName')}
          />
          <PasswordInput
            error={formState.errors.password?.message}
            label={t('field-labels:password_label')}
            {...register('password')}
          />
          <Group grow>
            <Button
              loading={formState.isSubmitting}
              type="submit"
              variant="light"
            >
              {t('button-labels:enter')}
            </Button>
            <Button
              color="gray"
              onClick={() => {
                reset();
              }}
              loading={formState.isSubmitting}
              variant="subtle"
            >
              {<TimerReset />}
            </Button>
          </Group>
        </Stack>
      </form>
      {children}
    </Modal>
  );
};
