import { Suspense, lazy } from 'react';
import { AppShellNavbar, Center, Group } from '@mantine/core';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
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
        <Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
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
