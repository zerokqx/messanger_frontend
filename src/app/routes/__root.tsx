import { useCheckAuth } from '@/features/checkAuth';
import { IsAuth } from '@/features/checkAuth/ui';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { AppShellNavbar } from '@/widgets/ChatAside';
import { LoginBadge } from '@/widgets/LoginBadge';
import { SideBarLayout } from '@/widgets/SideBar';
import { AppShell, Button } from '@mantine/core';
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { Modals } from '../ui/Modals';
import { TaberProvider, useTab } from '@/shared/ui/Tabs/ui/TaberProvider';

const Tes = () => {
  const { handlers } = useTab('asside');

  return (
    <>
      <Button
        onClick={() => {
          handlers.set();
        }}
      >
        GoNext
      </Button>{' '}
      <Button
        onClick={() => {
          handlers.back();
        }}
      >
        GoNext
      </Button>{' '}
    </>
  );
};
const RootLayout = () => {
  const settings = useModalGlobal((s) => s.pinOpen)('settings');
  const navigate = useRouter().navigate;
  return (
    <>
      <AppShell padding={'md'}>
        <AppShell.Main>
          <TaberProvider
            source="asside"
            windows={['chats', 'profile', 'search']}
            initial="chats"
          >
            <Tes />
            <Outlet />
          </TaberProvider>
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
