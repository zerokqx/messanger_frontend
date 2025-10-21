import { useGetBorder } from '@/shared/model/useGetBorder';
import { useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export const NotificationStyled = () => {
  const t = useMantineTheme();
  const bd = useGetBorder('0.1rem');
  return (
    <Notifications
      styles={{
        root: {
          borderRadius: t.radius.xl,
        },

        notification: {
          borderRadius: t.radius.xl,
          border: bd,
          background: t.black,
        },
      }}
    />
  );
};
