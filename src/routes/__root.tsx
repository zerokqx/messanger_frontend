import { checkAuth } from "@/utils";
import { AppShell } from "@mantine/core";
import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { useAsync } from "react-use";
const RootLayout = () => {
  const authStatus = useAsync(async () => {
    const auth = await checkAuth();
    console.log(auth);
  }, []);
  return (
    <>
      <AppShell>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  loader: ({ location }) => {
    if (location.pathname == "/login") return;
    const status = checkAuth(); //false
    console.log(status);
    if (status) {
      throw redirect({ to: "/login" });
    }
  },

  preload: true,
});
