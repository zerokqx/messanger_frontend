import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/devpanel')({
  component: RouteComponent,
  beforeLoad: () => {
    if (import.meta.env.DEV) {
      return;
    }
    throw redirect({
      to: '/',
    });
  },
});

function RouteComponent() {
  return <Outlet />;
}
