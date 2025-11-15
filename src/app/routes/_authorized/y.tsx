import { useCheckAuth } from '@/features/checkAuth/model';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/y')({
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
