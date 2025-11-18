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
import { useBus } from '@/shared/lib/hooks/useDataProvider';
import { number } from 'zod';

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
  const p = useBus.usePush();
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
