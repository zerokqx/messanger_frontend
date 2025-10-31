import { IsAuth } from '@/features/checkAuth/ui';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { SideBar } from '@/shared/ui/SideBar';
import { Video, MessageCircle, User, Cog } from 'lucide-react';
import { sidebarTab } from '../model/tab';
import { useInject } from '@/shared/providers/inject/model/useInject';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';

export const MainPage = () => {
  const [Taber, , useControl] = sidebarTab;
  const { set } = useControl();
  const { settings, navigate } =
    useInject<ReturnType<SideBarLayoutProp['inject']>>()();
  return (
    <Taber.Panel value="main">
      <SideBar.Item inDev text="Видео">
        <ColoredIcons Icon={Video} />
      </SideBar.Item>
      <SideBar.Item
        onClick={() => {
          void navigate({ to: '/videos' });
        }}
        text="Чаты"
      >
        <ColoredIcons Icon={MessageCircle} />
      </SideBar.Item>
      <SideBar.Item
        onClick={() => {
          set('profile');
        }}
        text="Профиль"
      >
        <ColoredIcons Icon={User} />
      </SideBar.Item>
      <SideBar.Item text="Настройки" onClick={settings}>
        <ColoredIcons Icon={Cog} />
      </SideBar.Item>
    </Taber.Panel>
  );
};
