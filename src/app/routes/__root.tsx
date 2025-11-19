import { NotFoundError } from '@/pages/404';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import z from 'zod';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { authMiddleware, useUserStore } from '@/entities/user';
import { profileClientNotQuery } from '@/shared/api/clients/profileClient';

const Com = () => {
  const d = Route.useLoaderData();
  console.log(d);
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
  loader: async () => {
    const user = await profileClientNotQuery(authMiddleware).GET('/me', {});
    if (user.data?.data) {
      useUserStore.setState({ data: user.data.data });
    }
    return { user };
  },
  component: Com,
  notFoundComponent: () => <NotFoundError />,
});
