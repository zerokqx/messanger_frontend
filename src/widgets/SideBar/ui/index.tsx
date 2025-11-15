import { Suspense, lazy } from 'react';
import { SideBar } from '@/shared/ui/SideBar';
import { Header } from './Header';
import { SideBarTaber } from '../model/tab';

// ленивые импорты табов
const MainPageLazy = lazy(() =>
  import('./tabs/Main.tab').then((m) => ({ default: m.MainPage }))
);

const ProfileLazy = lazy(() =>
  import('./tabs/Profile.tab').then((m) => ({ default: m.Profile }))
);

const ProfileEditLazy = lazy(() =>
  import('./tabs/Profile.tab.edit').then((m) => ({ default: m.ProfileEdit }))
);

const ProfileSettingsTabLazy = lazy(() =>
  import('./tabs/Permissions.tab.edit').then((m) => ({
    default: m.ProfileSettingsTab,
  }))
);

const SettingsLazy = lazy(() =>
  import('./tabs/Settings.tab').then((m) => ({ default: m.Settings }))
);

const InterfaceEditLazy = lazy(() =>
  import('./tabs/Interface.tab.edit').then((m) => ({
    default: m.InterfaceEdit,
  }))
);

export const SideBarWidget = () => {
  return (
    <SideBar>
      <Header />
      <Suspense fallback={null}>
        <SideBarTaber>
          <MainPageLazy />
          <ProfileLazy />
          <ProfileEditLazy />
          <SettingsLazy />
          <ProfileSettingsTabLazy />
          <InterfaceEditLazy />
        </SideBarTaber>
      </Suspense>
    </SideBar>
  );
};
