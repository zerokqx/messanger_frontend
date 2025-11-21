import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

export const useNotifyClipboard = () => {
  const clipboard = useClipboard();

  const handleCopy = (value: string, label: string) => {
    clipboard.copy(value);
    notifications.show({
      color: 'green',
      message: `${label} скопирован`,
    });
  };
  return handleCopy;
};
