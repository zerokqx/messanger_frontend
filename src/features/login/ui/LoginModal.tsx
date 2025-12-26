import { LoginForm } from '@/features/login';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { useCloseOpen } from '@/shared/model/useModalStore/lib/useCloseOpen';
import { Modal } from '@/shared/ui/Modal';
import { notifications } from '@mantine/notifications';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { ILoginModalProps } from '../types/loginModal.interface';

export const LoginModal = ({ whatClose }: ILoginModalProps) => {
  const { t } = useTranslation(['titles', 'buttonLabels', 'fieldLabels']);
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
              title: t('invalid_login'),
              message: t('invalid_message_login'),
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
