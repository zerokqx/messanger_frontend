import { $api } from '@/shared/api/repository/$api';
import { errorNotify } from '@/shared/lib/notifications/error';
import { useTranslation } from 'react-i18next';

export const useContactUpdate = () => {
  const { t } = useTranslation(['api-errors']);
  return $api.user.jwt.useMutation('patch', '/contact/update', {
    onError() {
      errorNotify(t('contact_update'));
    },
  });
};
