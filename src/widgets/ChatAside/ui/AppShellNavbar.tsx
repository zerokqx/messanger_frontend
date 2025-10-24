import { useBorder } from '@/widgets/Settings';
import { AppShellNavbar, Tabs, useMantineTheme } from '@mantine/core';
import { NavbarHeader } from './NavbarHeader';
import { SearchWindow } from './SearchWindow';
import { useChatAsideTabStore } from '../model/useChatAsideTabStore';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  const { currentTab, setCurrentTab } = useChatAsideTabStore();
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
            setCurrentTab('search');
          },
        }}
      />
      <Tabs value={currentTab}>
        <Tabs.Panel value="search">
          <SearchWindow />
        </Tabs.Panel>
      </Tabs>
    </AppShellNavbar>
  );
};
