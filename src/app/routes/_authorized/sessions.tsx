import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/sessions')({
  component: RouteComponent,
  loader: () => 'Hellow data',
});

function RouteComponent() {
  return <div>Hello "/_authorized/sessions"!</div>;
}
