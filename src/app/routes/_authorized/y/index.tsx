import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchMe } from '@/entities/user/model/me.query';
import { useCheckAuth } from '@/features/check-auth/model';
import { redirect } from '@tanstack/react-router';
import z from 'zod';
import { userAction } from '@/entities/user/model/user-store';
import { AppShellMain } from '@mantine/core';

export const Route = createFileRoute('/_authorized/y/')({
  validateSearch: z.object({
    query: z.string().optional(),
  }),

  beforeLoad: ({ location, search }) => {
    if (!useCheckAuth.check()) {
      throw redirect({
        to: '/auth',
        search: {
          ...search,
          redirect: location.href,
        },
      });
    }
  },
  loader: async () => {
    const user = await fetchMe();
    userAction.doInit(user.data);
    return { user: user.data };
  },
});
