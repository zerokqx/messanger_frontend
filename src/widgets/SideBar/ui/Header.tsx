import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { Drawer, CloseButton } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { sidebarTab } from '../model/tab';

export const Header = () => {
  const [, useStore, useControll] = sidebarTab;
  const current = useStore.useCurrentTab();
  const { goPrev, mainPage } = useControll();

  return (
    <Drawer.Header bg={'black'}>
      {current !== mainPage().name && (
        <CloseButton
          onClick={goPrev}
          icon={<ColoredIcons accent Icon={ArrowLeft} />}
        />
      )}
      <Drawer.CloseButton />
    </Drawer.Header>
  );
};
