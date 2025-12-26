import { NotFoundError } from '@/pages/404';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import z from 'zod';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { useUserStore } from '@/entities/user';
import { profileClientNotQuery } from '@/shared/api/clients/profileClient';
import { authMiddleware } from '@/shared/middlewares/auth';
import { fetchMe } from '@/entities/user/model/useQueryUser';

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
  loader: async () => {
    const user = await fetchMe();
    useUserStore.setState({ data: user.data });
    return { user };
  },
  component: Com,
  notFoundComponent: () => <NotFoundError />,
});
