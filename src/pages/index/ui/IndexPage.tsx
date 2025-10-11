import { CgProfile } from 'react-icons/cg';
import { useTokenStore } from '@/entities/token';
import { CustomMantineButton } from '@/shared/ui/Button';
import { SideBar } from '@/shared/ui/SideBar';
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
      <SideBar>
        <SideBar.Item text="Профиль">
          <CgProfile />
        </SideBar.Item>

        <SideBar.Item text="Чаты">
          <CgProfile />
        </SideBar.Item>

        <SideBar.Item text="Звонки">
          <CgProfile />
        </SideBar.Item>
      </SideBar>
    </>
  );
};
