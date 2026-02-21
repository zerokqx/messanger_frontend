import { LoginForm } from '@/features/login';
import { useModalGlobal } from '@/shared/model/use-modal-store';
import { useCloseOpen } from '@/shared/model/use-modal-store/lib/use-close-open';
import { Modal } from '@/shared/ui/modal';
import { notifications } from '@mantine/notifications';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { ILoginModalProps } from './types';

export const LoginModal = ({ whatClose }: ILoginModalProps) => {
  const { t } = useTranslation(['auth', 'button-labels', 'field-labels']);
  const close = useModalGlobal.usePinClose()('login');
  const swapMode = useCloseOpen('login', whatClose);
  const router = useRouter();
  return (
    <Modal keyModal="login">
      <LoginForm
        onSecondActionClick={swapMode}
        mutateProps={{
          onError() {
            notifications.show({
              title: t('auth:invalid_login'),
              message: t('auth:invalid_message_login'),
            });
          },
          onSuccess: () => {
            void router.invalidate();
            close();
          },
        }}
      />
    </Modal>
  );
};
