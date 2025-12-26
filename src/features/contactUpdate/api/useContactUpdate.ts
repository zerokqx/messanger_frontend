import { $api } from '@/shared/api/repository/$api';
import { errorNotify } from '@/shared/lib/notifications/error';
import { useTranslation } from 'react-i18next';

export const useContactUpdate = () => {
  const { t } = useTranslation(['apiErrors']);
  return $api.jwtUser.query.useMutation('patch', '/contact/update', {
    onError() {
      errorNotify(t('contact_update'));
    },
  });
};
