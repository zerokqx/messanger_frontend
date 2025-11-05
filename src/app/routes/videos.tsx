import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/videos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/videos"!</div>
}
