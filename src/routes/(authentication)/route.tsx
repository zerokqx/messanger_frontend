import { useLogin, useMe, useRefresh } from "@/hooks";
import { useUserStore } from "@/store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authentication)")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    const token = useUserStore.getState();
    const jwtValidate = token.validateToken();
    if (!jwtValidate) {
      token.removeToken();
      throw redirect({
        to: "/auth",
        search: {
          location: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  useRefresh();

  useMe();
  return <div>Hello "/(auth)"!</div>;
}
