import { i18n } from '@/shared/i18next/clients';
import { notifications } from '@mantine/notifications';

export const errorNotify = (message: string) => {
  notifications.show({
    message,
    color: 'red',
    title: i18n.t('titles:error'),
  });
};
