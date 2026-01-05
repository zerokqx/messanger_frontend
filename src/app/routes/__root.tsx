import { NotFoundError } from '@/pages/404';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import z from 'zod';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

const Com = () => {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: true,
          },
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
            defaultOpen: false,
          },
        ]}
      />
    </>
  );
};

export const Route = createRootRoute({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: Com,
  notFoundComponent: () => <NotFoundError />,
});
