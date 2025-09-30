import { checkAuth } from "@/utils/accessToken";
import { AppShell } from "@mantine/core";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import {
  TanStackRouterDevtools,
  TanStackRouterDevtoolsPanel,
} from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { useAsync } from "react-use";
const RootLayout = () => {
  const authStatus = useAsync(async () => {
    const auth = checkAuth();
    console.log(auth);
  }, []);
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
  loader: ({ location }) => {
    // if (location.pathname == "/login") return;
    // const status = checkAuth(); //false
    // console.log(status);
    // if (status) {
    //   throw redirect({ to: "/login" });
    // }
  },

  preload: true,
});
