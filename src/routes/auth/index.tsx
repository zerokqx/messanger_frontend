import { LoginForm } from "@/components/organisms/Form/Login";
import { RegisterForm } from "@/components/organisms/Form/Register";
import { Tabs } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs defaultValue={"Логин"}>
      <Tabs.List>
        <Tabs.Tab value="Логин">Логин</Tabs.Tab>
        <Tabs.Tab value="Регистрация">Регистрация</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="Логин">
        <LoginForm />;
      </Tabs.Panel>
      <Tabs.Panel value="Регистрация">
        <RegisterForm />
      </Tabs.Panel>
    </Tabs>
  );
}
