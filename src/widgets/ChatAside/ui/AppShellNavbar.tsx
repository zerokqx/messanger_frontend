import { Suspense, lazy } from 'react';
import { AppShellNavbar, Group } from '@mantine/core';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';

const SearchTabLazy = lazy(() =>
  import('./tabs/Search.tab').then((m) => ({ default: m.SearchTab }))
);

const SelectProfileTabLazy = lazy(() =>
  import('./tabs/SelectProfile/SelectProfile.tab').then((m) => ({
    default: m.SelectProfileTab,
  }))
);

export const AppShellNavbarWidget = () => {
  const set = useTabAppShell.useSetCurrentTab();
  return (
    <AppShellNavbar>
      <NavbarHeader
        input={{
          onFocus: () => {
            set('search');
          },
        }}
      />

      <Group p={'md'} grow>
        <Suspense fallback={null}>
          <AppShellTaber>
            <SearchTabLazy />
            <SelectProfileTabLazy />
            <AppShellTaber.Panel value="chats">
              <p>chats</p>
            </AppShellTaber.Panel>
          </AppShellTaber>
        </Suspense>
      </Group>
    </AppShellNavbar>
  );
};
