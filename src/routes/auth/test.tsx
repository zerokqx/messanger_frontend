import { Button, StrictInput } from "@/components";
import { SubscribeButton } from "@/components/organisms/Form/SubscribeButton";
import { Center, Text, useMantineTheme } from "@mantine/core";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <>
      <ChildForm title="Регистрация" form={form} />
      <p className="">dwd</p>
    </>
  );
}
