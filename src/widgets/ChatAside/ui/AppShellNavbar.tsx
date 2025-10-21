import { useAppSettings, useBorder } from '@/shared/lib/settings';
import { AppShellNavbar, useMantineTheme } from '@mantine/core';
import { NavbarHeader } from './NavbarHeader';

export const AppShellNavbarWidget = () => {
  const t = useMantineTheme();
  const d = useAppSettings((s) => s.borderElements);
  console.log(d);
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
