import { useMe } from '@/entities/user';
import { useCheckAuth } from '@/features/checkAuth/index.ts';
import { useRefresh } from '@/features/refresh/api/useRefresh.ts';
import { useLoginModal } from '@/widgets/LoginModal';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { lazy } from 'react';
export const Route = createFileRoute('/(authentication)')({
  component: RouteComponent,
  beforeLoad: () => {
    const token = useCheckAuth.check();

    if (!token) {
      useLoginModal.setState(() => ({ isOpen: true }));
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
