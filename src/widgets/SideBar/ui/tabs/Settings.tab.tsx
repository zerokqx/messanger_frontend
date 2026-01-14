import { useLogout } from '@/entities/user/model';
import { SideBar } from '@/shared/ui/SideBar';
import { LayoutTemplate, List, LogOut, UserCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import { Button } from '@mantine/core';

export const Settings = () => {
  const set = useTabSidebar.useSetCurrentTab();
  const logout = useLogout();
  const { t } = useTranslation('sideBar');

  return (
    <SideBarTaber.Panel value="settings">
      <SideBar.Item
        onClick={() => {
          set('profile_settings');
        }}
        icon={<UserCog />}
      >
        {t('profile_settings')}
      </SideBar.Item>

      <SideBar.Item
        onClick={() => {
          set('interface_edit');
        }}
        icon={<LayoutTemplate />}
      >
        {t('interface_edit')}
      </SideBar.Item>

      <SideBar.Item
        onClick={() => {
          set('sessions');
        }}
        icon={<List />}
      >
        {t('sessions')}
      </SideBar.Item>

      <Button
        onClick={() => {
          void logout();
        }}
      >
        <LogOut />
        Выйти
      </Button>
    </SideBarTaber.Panel>
  );
};
