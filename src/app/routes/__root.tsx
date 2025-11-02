import { useCheckAuth } from '@/features/checkAuth';
import { IsAuth } from '@/features/checkAuth/ui';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { AppShellNavbar } from '@/widgets/ChatAside';
import { LoginBadge } from '@/widgets/LoginBadge';
import { SideBarLayout } from '@/widgets/SideBar';
import { AppShell } from '@mantine/core';
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { Modals } from '../ui/Modals';
import { Notice } from '@/shared/ui/Notice';
const RootLayout = () => {
  const settings = useModalGlobal((s) => s.pinOpen)('settings');
  const navigate = useRouter().navigate;
  return (
    <>
      <AppShell>
        <AppShell.Main>
          <Outlet />
          <IsAuth status={false}>
            <LoginBadge />
          </IsAuth>
        </AppShell.Main>
        <IsAuth>
          <SideBarLayout inject={() => ({ navigate, settings })} />
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
