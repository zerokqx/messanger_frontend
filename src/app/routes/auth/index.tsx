import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  notFoundComponent: () => <p>NOO</p>,

  component: lazyRouteComponent(() => import('@/pages/auth'), 'AuhtPage'),
});
