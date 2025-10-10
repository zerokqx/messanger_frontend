import { useUserStore } from '@/entities/user';
import { CustomMantineButton } from '@/shared/ui/Button';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { notifications } from '@mantine/notifications';

export const IndexPage = () => {
  const { clearStore } = useUserStore();
  return (
    <>
      <ThemeToggle />
      <CustomMantineButton onClick={clearStore}>
        Clear access
      </CustomMantineButton>
      <CustomMantineButton
        onClick={() =>
          notifications.show({
            title: 'Test',
            message: 'Test',
          })
        }
      >
        Get Notify
      </CustomMantineButton>
    </>
  );
};
