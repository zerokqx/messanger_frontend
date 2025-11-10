import { AppShellNavbar, useMantineTheme } from '@mantine/core';
import { useLogger } from 'react-use';
import { assideTaber } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { SearchWindow } from './SearchWindow';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useHash } from 'react-use';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const [Taber, useStore] = assideTaber;
  const set = useStore.useSetCurrentTab();
  const [hash] = useHash();
  useEffect(() => {
    console.log(hash);
  });
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
      <Taber>
        <Taber.Panel value="profile" autoSet={hash.length > 0}>
          <p>Profile suka</p>
        </Taber.Panel>
        <Taber.Panel value="search">
          <SearchWindow />
        </Taber.Panel>
        <Taber.Panel value="chats">
          <p>chats</p>
        </Taber.Panel>
      </Taber>
    </AppShellNavbar>
  );
};
