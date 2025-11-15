import { useResponsive } from '@/shared/lib/hooks/useResponsive';
import { useGetBorder } from '@/shared/model/useGetBorder';
import { useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export const NotificationStyled = () => {
  const t = useMantineTheme();
  const { mobile } = useResponsive();
  const bd = useGetBorder('0.1rem');
  return (
    <Notifications
      limit={mobile ? 2 : 4}
      zIndex={'1000000'}
      position={mobile ? 'top-right' : 'top-right'}
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
