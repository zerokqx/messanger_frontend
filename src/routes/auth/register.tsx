import { StrictInput } from "@/components";
import { SubscribeButton } from "@/components/organisms/Form/SubscribeButton";
import { authClient } from "@/utils";
import { loginFormSchema } from "@/zod/inputForm";
import { Text, useMantineTheme, Center } from "@mantine/core";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

const {
  useFormContext,
  fieldContext: fieldContextLogin,
  formContext: formContextLogin,
  useFieldContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    StrictInput,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext: fieldContextLogin,
  formContext: formContextLogin,
});

const ChildForm = withForm({
  defaultValues: {
    userName: "",
    password: "",
  },
  validators: {
    onChange: loginFormSchema,
  },
  props: {
    title: "Форма",
  },

  render: function Render({ form, title }) {
    const theme = useMantineTheme();
    return (
      <Center
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          gap: theme.spacing.xs,
        }}
      >
        <Text fw={700}>{title}</Text>
        <form.AppField
          name="userName"
          children={(field) => (
            <field.StrictInput
              placeholder="Имя пользователя"
              contextHook={useFieldContext}
            />
          )}
        />

        <form.AppField
          name="password"
          children={(field) => (
            <field.StrictInput
              placeholder="Пороль"
              contextHook={useFieldContext}
            />
          )}
        />
        <form.AppForm>
          <form.SubscribeButton
            useFormContext={useFormContext}
            label="Submit"
          />
        </form.AppForm>
      </Center>
    );
  },
});
function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      userName: "",
      password: "",
    },

    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {},
  });
  return <ChildForm form={form} title="Регистраци" />;
}
