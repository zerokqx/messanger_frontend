import { AppShellNavbar, useMantineTheme } from '@mantine/core';
import { useLogger } from 'react-use';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { SearchTab } from './tabs/Search.tab';
import { SelectProfileTab } from './tabs/SelectProfile.tab';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const set = useTabAppShell.useSetCurrentTab();
  useLogger('Asside Taber');
  return (
    <AppShellNavbar
      bg="black"
      styles={{
        navbar: {
          overflow: 'hidden',
          overflowY: 'auto',
          gap: t.spacing.md,
        },
      }}
    >
      <NavbarHeader
        input={{
          onFocus: () => {
            set('search');
          },
        }}
      />
      <AppShellTaber>
        <SearchTab />
        <SelectProfileTab />
        <AppShellTaber.Panel value="chats">
          <p>chats</p>
        </AppShellTaber.Panel>
      </AppShellTaber>
    </AppShellNavbar>
  );
};
