import { Drawer, CloseButton, ThemeIcon } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { sideBarReset, useTabSidebar } from '../model/tab';
export const Header = () => {
  const goBack = useTabSidebar.useGoBack();
  const current = useTabSidebar.useCurrentTab();

  return (
    <Drawer.Header bdrs={'xl'}>
      {current !== sideBarReset() && (
        <CloseButton
          onClick={goBack}
          icon={<ThemeIcon children={<ArrowLeft />} />}
        />
      )}
      <Drawer.CloseButton />
    </Drawer.Header>
  );
};
