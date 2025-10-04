import { LoginForm } from "@/components/organisms/Form/Login";
import { Tabs } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs defaultValue={"Вход"}>
      <Tabs.List>
        <Tabs.Tab value="Логин">Логин</Tabs.Tab>
        <Tabs.Tab value="Регистрация">Регистрация</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="Логин">
        <LoginForm />;
      </Tabs.Panel>
    </Tabs>
  );
}
