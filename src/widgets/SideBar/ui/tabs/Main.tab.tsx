import { SideBar } from '@/shared/ui/SideBar';
import { Video, MessageCircle, User, Cog, Contact } from 'lucide-react';
import { useInject } from '@/shared/providers/inject/model/useInject';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import type { SideBarLayoutProp } from '../../types/sideBarLayout.type';

export const MainPage = () => {
  const { t } = useTranslation('sideBar');
  const set = useTabSidebar.useSetCurrentTab();

  return (
    <SideBarTaber.Panel value="main">
      <SideBar.Item inDev text={t('video')}>
        <Video />
      </SideBar.Item>
      <SideBar.Item
        onClick={() => {
          set('contacts');
        }}
        text={t('contacts')}
      >
        <Contact />
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
    </SideBarTaber.Panel>
  );
};
