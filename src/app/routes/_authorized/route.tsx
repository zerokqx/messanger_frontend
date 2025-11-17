import { createFileRoute } from '@tanstack/react-router';

import { AppShell, Button } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import { SideBarWidget } from '@/widgets/SideBar';
import { AppShellNavbar } from '@/widgets/ChatAside';
import {
  asideEffectStream,
  useAppshelData,
} from '@/widgets/ChatAside/ui/appshell.dataprvoder';
import { useLogger } from '@mantine/hooks';
import { useStore } from 'zustand';
export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

function RouteComponent() {
  const w = useAppshelData((s) => s.d('asside').assideL());
  const d = useStore(asideEffectStream);
  useLogger('ROUTE', [w]);

  return (
    <>
      <AppShell p={'md'}>
        <AppShell.Main bg={'black'}>
          <Outlet />
          <SideBarWidget />
          <AppShellNavbar />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
