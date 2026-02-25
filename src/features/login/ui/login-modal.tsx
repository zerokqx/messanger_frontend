import { LoginForm } from '@/features/login';
import { notifications } from '@mantine/notifications';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Modal, Stack, type ModalProps } from '@mantine/core';

export const LoginModal = ({ children, ...props }: ModalProps) => {
  const { t } = useTranslation(['auth', 'button-labels', 'field-labels']);
  const router = useRouter();
  return (
    <Modal {...props}>
      <Stack justify="center" mih={'100%'}>
        <LoginForm
          mutateProps={{
            onError() {
              notifications.show({
                title: t('auth:invalid_login'),
                message: t('auth:invalid_message_login'),
              });
            },
            onSuccess: () => {
              void router.invalidate();
              props.onClose();
            },
          }}
        />
      </Stack>
      {children}
    </Modal>
  );
};
