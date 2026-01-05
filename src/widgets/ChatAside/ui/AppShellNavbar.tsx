import { Suspense } from 'react';
import { AppShellNavbar, Center, Group } from '@mantine/core';
import { AppShellTaber, useTabAppShell } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { Loader } from 'lucide-react';
import { map } from 'lodash';
import { asideTabsConfig } from '../config/asideTabs.config';

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
        <AppShellTaber>
          {map(asideTabsConfig, (component) => (
            <Suspense fallback={component.fallback}>
              <component.render />
            </Suspense>
          ))}
          <Suspense
            fallback={
              <Center>
                <Loader />
              </Center>
            }
          >
            <AppShellTaber.Panel value="chats">
              <p>chats</p>
            </AppShellTaber.Panel>
          </Suspense>
        </AppShellTaber>
      </Group>
    </AppShellNavbar>
  );
};
