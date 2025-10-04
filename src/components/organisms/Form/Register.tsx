import { authClient } from "@/utils";
import { registerFormSchema } from "@/zod";
import { notifications } from "@mantine/notifications";
import { formOptions } from "@tanstack/react-form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createForm, useAppForm, useFieldContext } from ".";

export const RegisterForm = () => {
  const search = useSearch({
    from: "/auth",
  });
  const navigate = useNavigate();
  const registerFormOptions = formOptions({
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerFormSchema,
    },
  });
  const form = useAppForm({
    onSubmit: async ({ value }) => {
      const { data } = await authClient.POST("/register", {
        body: {
          password: value.password,
          login: value.userName,
        },
      });
      if (data?.status == "200") {
        form.reset();
        navigate({
          to: search.location,
          search,
        });
      } else {
        notifications.show({
          title: "Опа ошибка!",
          message: "Извините, попробуйте повторить запрос.",
          color: "red",
        });
      }
    },
    ...registerFormOptions,
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

      {
        name: "confirmPassword",
        placeholder: "Подтвердите пароль",
        contextHook: useFieldContext,
      },
    ],
    registerFormOptions,
  );

  return <Form form={form} title="Регистраця" />;
}
