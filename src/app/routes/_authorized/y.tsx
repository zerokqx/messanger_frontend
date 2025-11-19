import { useCheckAuth } from '@/features/checkAuth/model';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/_authorized/y')({
  validateSearch: z.object({
    query: z.string().optional(),
    uuid: z.uuid().optional(),
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
});
