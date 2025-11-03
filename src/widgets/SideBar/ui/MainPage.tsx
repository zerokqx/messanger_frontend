import { SideBar } from '@/shared/ui/SideBar';
import { Video, MessageCircle, User, Cog } from 'lucide-react';
import { sidebarTab } from '../model/tab';
import { useInject } from '@/shared/providers/inject/model/useInject';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';

export const MainPage = () => {
  const [Taber, useStore] = sidebarTab;
  const set = useStore.useSetCurrentTab();
  const { navigate } = useInject<ReturnType<SideBarLayoutProp['inject']>>()();
  return (
    <Taber.Panel value="main">
      <SideBar.Item inDev text="Видео">
        <Video />
      </SideBar.Item>
      <SideBar.Item
        onClick={() => {
          void navigate({ to: '/videos' });
        }}
        text="Чаты"
      >
        <MessageCircle />
      </SideBar.Item>
      <SideBar.Item
        onClick={() => {
          set('profile');
        }}
        text="Профиль"
      >
        <User />
      </SideBar.Item>
      <SideBar.Item
        text="Настройки"
        onClick={() => {
          set('settings');
        }}
      >
        <Cog />
      </SideBar.Item>
    </Taber.Panel>
  );
};
