import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad({ context: { auth }, location }) {
    if (auth) {
      throw redirect({ to: '/y' });
    } else {
      throw redirect({ to: '/auth', search: { redirect: location.pathname } });
    }
  },
  component: () => null,
});
