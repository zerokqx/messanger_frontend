import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { Drawer, CloseButton } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { sidebarTab } from '../model/tab';

export const Header = () => {
  const [, useStore, , main] = sidebarTab;
  const current = useStore.useCurrentTab();
  const goBack = useStore.useGoBack();

  return (
    <Drawer.Header bg={'black'}>
      {current !== main() && (
        <CloseButton
          onClick={goBack}
          icon={<ColoredIcons accent Icon={ArrowLeft} />}
        />
      )}
      <Drawer.CloseButton />
    </Drawer.Header>
  );
};
