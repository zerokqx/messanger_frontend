import { StrictInput } from "@/components";
import LightSwitch from "@/components/atoms/Light";
import { SubscribeButton } from "@/components/organisms/Form/SubscribeButton";
import { useUserStore } from "@/store";
import { authClient } from "@/utils";
import { loginFormSchema } from "@/zod/inputForm";
import { Text, useMantineTheme, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login")({
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
          width: "100vw",
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
              styles={{}}
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
        <LightSwitch />
      </Center>
    );
  },
});
function RouteComponent() {
  const { setToken } = useUserStore();
  const { location } = Route.useSearch();
  const navigate = Route.useNavigate();
  const form = useAppForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { data } = await authClient.POST("/login", {
        body: {
          password: value.password,
          login: value.userName,
        },
      });
      if (data?.status == "200" || data?.data.access_token) {
        form.reset();
        setToken(data?.data.access_token);
        navigate({
          to: location,
          search: { location },
        });
      } else {
        notifications.show({
          title: "Опа ошибка!",
          message:
            "Не пережевайте - это на нашей стороне скоро все будет исправлено",
          color: "red",
        });
      }
    },
  });
  return <ChildForm form={form} title="Вход в систему" />;
}
