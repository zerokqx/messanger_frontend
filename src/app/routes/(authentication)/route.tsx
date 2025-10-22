import { useMe } from '@/entities/user';
import { useCheckAuth } from '@/features/checkAuth/index.ts';
import { useRefresh } from '@/features/refresh/api/useRefresh.ts';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/(authentication)')({
  component: RouteComponent,
  beforeLoad: () => {
    const token = useCheckAuth.check();

    if (!token) {
      useModalGlobal.getState().open('login');
      throw redirect({
        to: '/',
      });
    }
  },
});

function RouteComponent() {
  useRefresh();
  useMe();
  return (
    <>
      <Outlet />
    </>
  );
}
