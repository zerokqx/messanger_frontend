import { Suspense, lazy, useEffect } from 'react';
import {
  AppShellNavbar,
  Button,
  Container,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { useLogger } from 'react-use';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { useAppshelData } from './appshell.dataprvoder';
import { useStore } from 'zustand';

const SearchTabLazy = lazy(() =>
  import('./tabs/Search.tab').then((m) => ({ default: m.SearchTab }))
);

const SelectProfileTabLazy = lazy(() =>
  import('./tabs/SelectProfile.tab').then((m) => ({
    default: m.SelectProfileTab,
  }))
);

export const AppShellNavbarWidget = () => {
  const assideLength = useAppshelData((s) => s.d('asside').assidePush);
  const t = useMantineTheme();
  const set = useTabAppShell.useSetCurrentTab();
  return (
    <AppShellNavbar
      bg="black"
      styles={{
        navbar: {
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

      <Group p={'md'} grow>
        {/* <Button */}
        {/*   onClick={() => { */}
        {/*     assideLength({ type: 'number', data: { value: Math.random() } }); */}
        {/*   }} */}
        {/* > */}
        {/*   dwd */}
        {/* </Button> */}
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
