import { useRegister } from "@/services";
import { registerFormSchema } from "@/zod";
import { formOptions } from "@tanstack/react-form";
import { useSearch } from "@tanstack/react-router";
import { createForm, useAppForm, useFieldContext } from ".";

export const RegisterForm = () => {
  const search = useSearch({
    from: "/auth",
  });
  const { mutate } = useRegister(search);
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
      form.reset();
      mutate({
        body: {
          password: value.password,
          login: value.userName,
        },
      });
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
};
