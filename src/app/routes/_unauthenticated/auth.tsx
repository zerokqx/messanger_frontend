import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const Route = createFileRoute('/_unauthenticated/auth')({
  validateSearch: zodValidator(
    z.object({
      redirect: z.string().catch('/y'),
    })
  ),
  component: lazyRouteComponent(() => import('@/pages/auth'), 'AuhtPage'),
});
