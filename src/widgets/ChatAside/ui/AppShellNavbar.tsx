import { useBorder } from '@/widgets/Settings';
import { AppShellNavbar, Tabs, useMantineTheme } from '@mantine/core';
import { NavbarHeader } from './NavbarHeader';
import { SearchWindow } from './SearchWindow';
import { useChatAsideTabStore } from '../model/useChatAsideTabStore';
import { createTaber } from '@/shared/ui/Tabs/ui';
import { useLogger } from 'react-use';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  const store = useChatAsideTabStore();
  const [controll, Taber] = createTaber({
    windows: ['chats', 'search'],
    store,
  });

  useLogger('Hoc', { controll });
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
            controll.set('search');
          },
        }}
      />
      <Taber>
        <Taber.Panel value="search">
          <SearchWindow />
        </Taber.Panel>
      </Taber>
    </AppShellNavbar>
  );
};
