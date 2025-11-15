import { useCheckAuth } from '@/features/checkAuth/model';
import { AppShell, AppShellMain, Center, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  beforeLoad({ search }) {
    if (useCheckAuth.check()) {
      redirect({
        throw: true,
        to: '/',
        from: '/auth',
        search,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppShell disabled p={'0'}>
        <AppShellMain bg={'black'}>
          <Center h={'100vh'}>
            <Stack>
              <Outlet />
            </Stack>
          </Center>
        </AppShellMain>
      </AppShell>
    </>
  );
}
