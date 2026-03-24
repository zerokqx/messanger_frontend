import { createFileRoute } from '@tanstack/react-router';
import { useCheckAuth } from '@/features/check-auth/model';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/y/')({

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
