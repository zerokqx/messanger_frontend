import { InjectContext } from '@/shared/providers/inject/ui/InjectContext';
import { SideBar } from '@/shared/ui/SideBar';
import { sidebarTab } from '../model/tab';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { Profile } from './Profile';
import { ProfileEdit } from './ProfileEdit';

export const SideBarLayout = ({ inject }: SideBarLayoutProp) => {
  const [Taber] = sidebarTab;

  return (
    <>
      <InjectContext value={inject}>
        <SideBar>
          <Header />
          <Taber>
            <MainPage />
            <Profile />
            <ProfileEdit />
          </Taber>
        </SideBar>
      </InjectContext>
    </>
  );
};
