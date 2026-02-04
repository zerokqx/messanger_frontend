import { useResponsive } from '@/shared/lib/hooks/use-responsive';
import { notifications, Notifications } from '@mantine/notifications';

export const NotificationStyled = () => {
  const { mobile } = useResponsive();
  return (
    <Notifications
      onClick={() => {
        notifications.clean();
      }}
      limit={mobile ? 2 : 4}
      zIndex={'1000000'}
      position={mobile ? 'top-right' : 'top-right'}
    />
  );
};
