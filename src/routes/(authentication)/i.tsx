import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authentication)/i')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authentication)/i"!</div>
}
