import { useUserStore } from "@/store";
import { authClient } from "@/utils";
import { loginFormSchema } from "@/zod";
import { notifications } from "@mantine/notifications";
import { formOptions } from "@tanstack/react-form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createForm, useAppForm, useFieldContext } from ".";
import type { FieldSet } from "./types";

export const LoginForm = () => {
  const { setToken } = useUserStore();
  const search = useSearch({
    from: "/auth",
  });
  const navigate = useNavigate();
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
          to: search.location,
          search,
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
  const Form = createForm(
    [
      {
        name: "userName",
        placeholder: "Имя пользователя",
        contextHook: useFieldContext,
      },

      {
        name: "password",
        placeholder: "Пороль",
        contextHook: useFieldContext,
      },
    ],
    {
      defaultValues: {
        userName: "",
        password: "",
      },
      validators: {
        onChange: loginFormSchema,
      },
    },
  );

  return <Form form={form} title="Вход в систему" />;
};
