import { createFileRoute } from '@tanstack/react-router';

import { AppShell, Button } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import { SideBarWidget } from '@/widgets/SideBar';
import { AppShellNavbar } from '@/widgets/ChatAside';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

function RouteComponent() {
  const disabled = useLayoutStore((s) => s.data.disable);

  return (
    <>
      <AppShell {...{ disabled }} p={'md'}>
        <AppShell.Main bg={'black'}>
          <Outlet />
          <SideBarWidget />
          <AppShellNavbar />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
