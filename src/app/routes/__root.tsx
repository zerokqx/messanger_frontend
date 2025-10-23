import { IsAuth } from '@/features/checkAuth/ui';
import { AppShellNavbar } from '@/widgets/ChatAside';
import { LoginBadge } from '@/widgets/LoginBadge';
import { SideBarLayout } from '@/widgets/SideBar';
import { AppShell, useMantineTheme } from '@mantine/core';
import { createRootRoute, Outlet } from '@tanstack/react-router';
const RootLayout = () => {
  const t = useMantineTheme();
  return (
    <>
      <AppShell
        padding={'md'}
        navbar={{
          width: '300px',
          breakpoint: 'xs',
          collapsed: {
            mobile: false,
          },
        }}
        bg={t.black}
      >
        <AppShell.Main>
          <Outlet />
          <IsAuth status={false}>
            <LoginBadge />
          </IsAuth>
        </AppShell.Main>
        <AppShellNavbar />
      </AppShell>
      <SideBarLayout />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
