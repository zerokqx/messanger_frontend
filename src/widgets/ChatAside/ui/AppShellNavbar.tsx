import { Suspense, lazy } from 'react';
import { AppShellNavbar, Group } from '@mantine/core';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';

const SearchTabLazy = lazy(() =>
  import('./tabs/Search.tab').then((m) => ({ default: m.SearchTab }))
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

      <Group p={'xs'} grow>
        <Suspense fallback={null}>
          <AppShellTaber>
            <SearchTabLazy />
            <AppShellTaber.Panel value="chats">
              <p>chats</p>
            </AppShellTaber.Panel>
          </AppShellTaber>
        </Suspense>
      </Group>
    </AppShellNavbar>
  );
};
