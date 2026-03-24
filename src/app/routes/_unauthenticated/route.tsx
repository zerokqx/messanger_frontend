import Logger from '@/shared/lib/logger/logger';
import { AppShell, AppShellMain, Center, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: ({ context: { auth }, }): void => {
    Logger.debug('_unathenticated/route.tsx', 'AUTH', auth);
    if (auth) {
      throw redirect({
        to: '/y',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppShell disabled p={'0'}>
        <AppShellMain>
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
