import { useRefresh } from '@/entities/token';
import { useMe } from '@/entities/user';
import { useCheckAuth } from '@/entities/user/model/useCheckAuth.ts';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { lazy } from 'react';
export const Route = createFileRoute('/(authentication)')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    const token = useCheckAuth.check();

    if (!token) {
      return redirect({
        to: '/auth',
        search: {
          location: location.href,
        },
      });
    }
  },
});

const SideBarLazy = lazy(() => import('./_layout.tsx'));
function RouteComponent() {
  useRefresh();
  useMe();
  return (
    <>
      <Outlet />
      <SideBarLazy />
    </>
  );
}
