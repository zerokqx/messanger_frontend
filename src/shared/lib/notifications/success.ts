import { notifications } from '@mantine/notifications';

export const successNotify = (message: string, title?: string) => {
  notifications.show({
    message,
    color: 'green',
    title: title ?? 'Success',
  });
};
