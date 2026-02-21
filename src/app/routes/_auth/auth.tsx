import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const Route = createFileRoute('/_auth/auth')({
  validateSearch: zodValidator(
    z.object({
      redirect: z.string().catch('/y'),
    })
  ),
  notFoundComponent: () => <p>NOO</p>,

  component: lazyRouteComponent(() => import('@/pages/auth'), 'AuhtPage'),
});
