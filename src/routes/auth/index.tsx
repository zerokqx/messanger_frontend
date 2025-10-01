import LightSwitch from "@/components/atoms/Light";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LightSwitch />
    </div>
  );
}
