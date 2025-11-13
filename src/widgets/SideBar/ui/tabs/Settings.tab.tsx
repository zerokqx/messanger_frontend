import { useLogout } from '@/entities/user/model';
import { CustomMantineButton } from '@/shared/ui/Button';
import { SideBar } from '@/shared/ui/SideBar';
import { LayoutTemplate, LogOut, UserCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';

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
        text={t('profile_settings')}
      >
        <UserCog />
      </SideBar.Item>

      <SideBar.Item
        onClick={() => {
          set('interface_edit');
        }}
        text={t('interface_edit')}
      >
        <LayoutTemplate />
      </SideBar.Item>

      <CustomMantineButton onClick={logout}>
        <LogOut />
        Выйти
      </CustomMantineButton>
    </SideBarTaber.Panel>
  );
};
