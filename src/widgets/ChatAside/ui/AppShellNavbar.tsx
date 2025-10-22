import { AppShellNavbar, useMantineTheme } from '@mantine/core';
import { NavbarHeader } from './NavbarHeader';
import { useBorder } from '@/shared/lib/hooks/settings';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  return (
    <AppShellNavbar
      withBorder={false}
      bg={t.black}
      styles={{
        navbar: {
          border: bd,
        },
      }}
    >
      <NavbarHeader />
    </AppShellNavbar>
  );
};
