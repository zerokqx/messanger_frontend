import { useMe } from "@/entities/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authentication)/i")({
  component: RouteComponent,
});

function RouteComponent() {
  useMe();
  return <div>Hello "/(authentication)/i"!</div>;
}
