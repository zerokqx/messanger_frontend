import { InjectContext } from '@/shared/providers/inject/ui/InjectContext';
import { SideBar } from '@/shared/ui/SideBar';
import { CloseButton, Drawer } from '@mantine/core';
import { sidebarTab } from '../model/tab';
import type { SideBarLayoutProp } from '../types/sideBarLayout.type';
import { MainPage } from './MainPage';
import { ProfileEdit } from './ProfileEdit';
import { ArrowLeft } from 'lucide-react';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';

export const SideBarLayout = ({ inject }: SideBarLayoutProp) => {
  const [Taber, useStore, useControll] = sidebarTab;
  const current = useStore.useCurrentTab();

  const { goPrev } = useControll();

  return (
    <>
      <InjectContext value={inject}>
        <SideBar>
          <Drawer.Header bg={'black'}>
            {current !== 'main' && (
              <CloseButton
                onClick={goPrev}
                icon={<ColoredIcons accent Icon={ArrowLeft} />}
              />
            )}
            <Drawer.CloseButton />
          </Drawer.Header>
          <Taber>
            <MainPage />
            <ProfileEdit />
          </Taber>
        </SideBar>
      </InjectContext>
    </>
  );
};
