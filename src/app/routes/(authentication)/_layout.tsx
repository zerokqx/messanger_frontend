import { UserBadge } from '@/entities/user';
import { SideBar } from '@/shared/ui/SideBar';
import { SettingsModal } from '@/widgets/Settings/ui';
import { useDisclosure } from '@mantine/hooks';
import { Cog, MessageCircle, User } from 'lucide-react';

export const SideBarLayout = () => {
  const settings = useDisclosure(false);
  return (
    <>
      <SettingsModal disclosure={settings} />
      <SideBar renderUserBadge={() => <UserBadge />}>
        <SideBar.Item text="Профиль">
          <User />
        </SideBar.Item>
        <SideBar.Item text="Чаты">
          <MessageCircle />
        </SideBar.Item>
        <SideBar.Item text="Настройки" onClick={settings[1].toggle}>
          <Cog />
        </SideBar.Item>
      </SideBar>
    </>
  );
};
