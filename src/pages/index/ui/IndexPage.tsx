import { useTokenStore } from '@/entities/token';
import { CustomMantineButton } from '@/shared/ui/Button';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { notifications } from '@mantine/notifications';

export const IndexPage = () => {
  const { clearStore } = useTokenStore();
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
