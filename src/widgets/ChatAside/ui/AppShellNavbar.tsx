import { useBorder } from '@/widgets/Settings';
import { AppShellNavbar, useMantineTheme } from '@mantine/core';
import { useLogger } from 'react-use';
import { assideTaber } from '../lib/tab';
import { NavbarHeader } from './NavbarHeader';
import { SearchWindow } from './SearchWindow';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  const [Taber, useStore] = assideTaber;
  const set = useStore.useSetCurrentTab();
  useLogger('Asside Taber');
  return (
    <AppShellNavbar
      withBorder={false}
      bg={t.black}
      styles={{
        navbar: {
          gap: t.spacing.md,
          border: bd,
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
        <Taber.Panel value="search">
          <SearchWindow />
        </Taber.Panel>
        <Taber.Panel value="chats">
          <p>Чаты </p>
        </Taber.Panel>
      </Taber>
    </AppShellNavbar>
  );
};
