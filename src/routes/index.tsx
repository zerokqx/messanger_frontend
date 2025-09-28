import { ThemeToggle } from "@/components";
import { SideMenu } from "@/components/organisms/SideMenu";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <ThemeToggle />;
}
