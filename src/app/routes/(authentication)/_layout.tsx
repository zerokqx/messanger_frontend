import { UserBadge } from '@/entities/user';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { SideBar } from '@/shared/ui/SideBar';
import { useSettingsStore } from '@/widgets/Settings/model';
import { SettingsModal } from '@/widgets/Settings/ui';
import { Cog, MessageCircle, User } from 'lucide-react';

export default function SideBarLayout() {
  const { toggle } = useSettingsStore();
  return (
    <>
      <SettingsModal />
      <SideBar renderUserBadge={() => <UserBadge />}>
        <SideBar.Item text="Профиль">
          <ColoredIcons Icon={User} />
        </SideBar.Item>
        <SideBar.Item text="Чаты">
          <ColoredIcons Icon={MessageCircle} />
        </SideBar.Item>
        <SideBar.Item  text="Настройки" onClick={toggle}>
          <ColoredIcons Icon={Cog} />
        </SideBar.Item>
      </SideBar>
    </>
  );
}
