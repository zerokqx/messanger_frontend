import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';
import { errorNotify } from '@/shared/lib/notifications/error';
import { useTranslation } from 'react-i18next';

export const useContactUpdate = () => {
  const { t } = useTranslation(['apiErrors']);
  return userClient(authMiddleware)().useMutation('patch', '/contact/update', {
    onError() {
      errorNotify(t('contact_update'));
    },
  });
};
