import { UserBadge } from '@/entities/user';
import { InjectContext } from '@/shared/providers/inject/ui/InjectContext';
import { SideBar } from '@/shared/ui/SideBar';
import { sidebarTab } from '../model/tab';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';
import { MainPage } from './MainPage';
import { ProfileEdit } from './ProfileEdit';

export const SideBarLayout = ({ inject }: SideBarLayoutProp) => {
  const [Taber, ,] = sidebarTab;
  return (
    <>
      <InjectContext value={inject}>
        <SideBar>
          <Taber>
            <MainPage />
            <ProfileEdit />
          </Taber>
        </SideBar>
      </InjectContext>
    </>
  );
};
