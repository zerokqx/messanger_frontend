import { useUserStore } from "@/entities/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => ({
    location: (search.location as string) || "/",
  }),
  beforeLoad: ({ search }) => {
    const jwt = useUserStore.getState().validateToken();

    if (jwt) {
      throw redirect({
        to: search.location,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
