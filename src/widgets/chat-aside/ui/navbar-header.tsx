import { SearchInputWrapper } from '@/features/search';
import { useSideBarStore } from '@/shared/ui/side-bar/store/use-menu-store';
import { Burger, CloseButton, Grid, type TextInputProps } from '@mantine/core';
import { appShellReset, AppShellTaber, useTabAppShell } from '../lib/tab';
import { Else, If, Then } from 'react-if';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const isOpen = useSideBarStore.useIsOpen();
  const toggle = useSideBarStore.useToggle();
  const goBack = useTabAppShell.useGoBack();
  const currentTab = useTabAppShell.useCurrentTab();

  return (
    <Grid p={'md'} align="center">
      <Grid.Col span={'content'}>
        <If condition={currentTab !== appShellReset()}>
          <Then>
            <CloseButton onClick={goBack} />
          </Then>
          <Else>
            <AppShellTaber.OnlyOnTab on={appShellReset()}>
              <Burger
                size={'md'}
                opened={isOpen}
                onClick={toggle}
                color="blue"
                aria-label="Toggle SideBar"
              />
            </AppShellTaber.OnlyOnTab>
          </Else>
        </If>
      </Grid.Col>
      <Grid.Col span={'auto'}>
        <SearchInputWrapper {...input} />
      </Grid.Col>
    </Grid>
  );
};
