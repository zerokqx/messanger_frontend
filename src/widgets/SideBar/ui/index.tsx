import { InjectContext } from '@/shared/providers/inject/ui/InjectContext';
import { SideBar } from '@/shared/ui/SideBar';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';
import { Header } from './Header';
import { MainPage } from './tabs/Main.tab';
import { Profile } from './tabs/Profile.tab';
import { ProfileEdit } from './tabs/Profile.tab.edit';
import { ProfileSettingsTab } from './tabs/Permissions.tab.edit';
import { Settings } from './tabs/Settings.tab';
import { InterfaceEdit } from './tabs/Interface.tab.edit';
import { SideBarTaber } from '../model/tab';
export const SideBarLayout = ({ inject }: SideBarLayoutProp) => {
  return (
    <>
      <InjectContext value={inject}>
        <SideBar>
          <Header />
          <SideBarTaber>
            <MainPage />
            <Profile />
            <ProfileEdit />
            <Settings />
            <ProfileSettingsTab />
            <InterfaceEdit />
          </SideBarTaber>
        </SideBar>
      </InjectContext>
    </>
  );
};
