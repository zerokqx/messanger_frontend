import { ThemeToggle } from "@/components";
import { SideMenu } from "@/components/organisms/SideMenu";
import { authMiddleware } from "@/midlewares";
import { authClient } from "@/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAsync } from "react-use";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const auth = authClient;
  authClient.use(authMiddleware);
  // useAsync(async () => {
  //   const a = await authClient.POST("/login", {
  //     body: {
  //       login: "d",
  //       password: "d",
  //     },
  //   });
  //   console.log(a);
  // }, []);
  return <ThemeToggle />;
}
