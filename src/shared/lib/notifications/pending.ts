import { notifications } from '@mantine/notifications';

export const pendingNotify = (message: string, title?: string) => {
  notifications.show({
    message,
    color: 'gray',
    title: title ?? 'Pending',
  });
};
