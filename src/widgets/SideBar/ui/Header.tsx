import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { Drawer, CloseButton } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { sideBarReset, useTabSidebar } from '../model/tab';
export const Header = () => {
  const goBack = useTabSidebar.useGoBack();
  const current = useTabSidebar.useCurrentTab();

  return (
    <Drawer.Header bg={'black'} bdrs={'xl'}>
      {current !== sideBarReset() && (
        <CloseButton
          onClick={goBack}
          icon={<ColoredIcons accent Icon={ArrowLeft} />}
        />
      )}
      <Drawer.CloseButton />
    </Drawer.Header>
  );
};
