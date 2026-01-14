import { notifications } from '@mantine/notifications';

export const errorNotify = (message: string, title?: string) => {
  notifications.show({
    message,
    color: 'red',
    title: title ?? 'Error',
  });
};
