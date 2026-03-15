import { createFileRoute } from '@tanstack/react-router';
import { useCheckAuth } from '@/features/check-auth/model';
import { redirect } from '@tanstack/react-router';
import z from 'zod';

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
});
