import { getAccessFromZustand, useUserStore } from "@/store";
import type { TUserState } from "@/store/userStore/userStore.type";
import { AppShell } from "@mantine/core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
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
      <TanStackDevtools
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          FormDevtoolsPlugin(),
        ]}
      />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
