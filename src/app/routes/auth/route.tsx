import { useTokenStore } from '@/entities/token';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  validateSearch: (search) => ({
    location: (search.location as string) || '/',
  }),
  beforeLoad: ({ search }) => {
    const jwt = useTokenStore.getState().validateToken();

    if (jwt) {
      console.log('ex');
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
