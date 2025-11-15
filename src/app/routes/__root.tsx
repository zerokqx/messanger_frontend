import { NotFoundError } from '@/pages/404';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import z from 'zod';

export const Route = createRootRoute({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundError />,
});
