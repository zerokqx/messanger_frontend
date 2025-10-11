import { useRefresh, useTokenStore } from '@/entities/token';
import { useMe } from '@/entities/user';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/(authentication)')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    const token = useTokenStore.getState();

    const jwtValidate = token.validateToken();
    console.log(!jwtValidate);
    if (!jwtValidate) {
      token.clearStore();
      return redirect({
        to: '/auth',
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
  return <Outlet />;
}
