import { i18n } from '@/shared/i18next/clients';
import { notifications } from '@mantine/notifications';

export const successNotify = (message: string) => {
  notifications.show({
    message,
    color: 'green',
    title: i18n.t('titles:success'),
  });
};
