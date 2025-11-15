import { createFileRoute } from '@tanstack/react-router';

import { AppShell } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import { SideBarWidget } from '@/widgets/SideBar';
import { AppShellNavbar } from '@/widgets/ChatAside';
export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppShell p={'md'}>
        <AppShell.Main bg={'black'}>
          dwd
          <Outlet />
          <SideBarWidget />
          <AppShellNavbar />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
