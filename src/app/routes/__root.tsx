import { useCheckAuth } from '@/features/checkAuth';
import { IsAuth } from '@/features/checkAuth/ui';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
import { AppShellNavbar } from '@/widgets/ChatAside';
import { LoginBadge } from '@/widgets/LoginBadge';
import { SideBarLayout } from '@/widgets/SideBar';
import { AppShell, useMantineTheme } from '@mantine/core';
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { Modals } from '../ui/Modals';
const RootLayout = () => {
  const t = useMantineTheme();
  return (
    <>
      <AppShell
        p={'xs'}
        navbar={{
          width: '20rem',
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
        <IsAuth>
          <SideBarLayout />
          <AppShellNavbar />
        </IsAuth>
        <Modals />
      </AppShell>
    </>
  );
};

export const Route = createRootRouteWithContext<{ auth: AuthContextTypes }>()({
  component: RootLayout,

  beforeLoad({ location }) {
    if (location.pathname === '/auth') return;
    if (!useCheckAuth.check()) {
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
