import { loginFormSchema } from "@/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createForm, useAppForm, useFieldContext } from ".";
import { useLogin } from "@/services";

export const LoginForm = () => {
  const search = useSearch({
    from: "/auth",
  });
  const { mutate } = useLogin(search);

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
      mutate({
        body: {
          password: value.password,
          login: value.userName,
        },
      });
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
