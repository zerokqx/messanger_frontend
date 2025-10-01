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
import { useUserStore } from "@/store";
import type { TUserState } from "@/store/userStore/userStore.type";
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
    if (location.pathname.startsWith("/auth")) return;

    const user = localStorage.getItem("user-storage");

    if (!user) {
      throw redirect({ to: "/auth/login" });
    }

    try {
      const userJson: { state?: TUserState } = JSON.parse(user);
      const token = userJson.state?.accessToken?.token;

      if (!token) {
        throw redirect({ to: "/auth/login" });
      }

      return;
    } catch (e) {
      throw redirect({ to: "/auth/login" });
    }
  },

  preload: true,
});
