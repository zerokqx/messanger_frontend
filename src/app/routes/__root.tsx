import { AppShell } from '@mantine/core';
import { createRootRoute, Outlet } from '@tanstack/react-router';
const RootLayout = () => {
  return (
    <>
      <AppShell>
        <AppShell.Main
          style={(theme) => ({
            background: theme.black,
          })}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
      {/* <TanStackDevtools */}
      {/*   plugins={[ */}
      {/*     { */}
      {/*       name: "TanStack Router", */}
      {/*       render: <TanStackRouterDevtoolsPanel />, */}
      {/*     }, */}
      {/*     FormDevtoolsPlugin(), */}
      {/*   ]} */}
      {/* /> */}
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
