import { SideBar } from '@/shared/ui/SideBar';
import { Video, MessageCircle, User, Cog } from 'lucide-react';
import { sidebarTab } from '../model/tab';
import { useInject } from '@/shared/providers/inject/model/useInject';
import { useTranslation } from 'react-i18next';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';

export const MainPage = () => {
  const { t } = useTranslation('sideBar');
  const [Taber, useStore] = sidebarTab;
  const set = useStore.useSetCurrentTab();
  const { navigate } = useInject<ReturnType<SideBarLayoutProp['inject']>>()();

  return (
    <Taber.Panel value="main">
      <SideBar.Item inDev text={t('video')}>
        <Video />
      </SideBar.Item>

      <SideBar.Item
        onClick={() => {
          void navigate({ to: '/videos' });
        }}
        text={t('chats')}
      >
        <MessageCircle />
      </SideBar.Item>

      <SideBar.Item
        onClick={() => {
          set('profile');
        }}
        text={t('profile')}
      >
        <User />
      </SideBar.Item>

      <SideBar.Item
        text={t('settings')}
        onClick={() => {
          set('settings');
        }}
      >
        <Cog />
      </SideBar.Item>
    </Taber.Panel>
  );
};
