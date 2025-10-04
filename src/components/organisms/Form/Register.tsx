import { useUserStore } from "@/store";
import { authClient } from "@/utils";
import { notifications } from "@mantine/notifications";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FormBase, useAppForm, useFieldContext } from ".";
import type { FieldSet } from "./types";
import { registerFormSchema } from "@/zod";

const registreFormData: FieldSet<typeof registerFormSchema>[] = [
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
];
export const RegisterForm = () => {
  const { setToken } = useUserStore();
  const search = useSearch({
    from: "/auth",
  });
  const navigate = useNavigate();
  const form = useAppForm({
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerFormSchema,
    },
    onSubmit: async ({ value }) => {
      // const { data } = await authClient.POST("/login", {
      //   body: {
      //     password: value.password,
      //     login: value.userName,
      //   },
      // });
      // if (data?.status == "200" || data?.data.access_token) {
      //   form.reset();
      //   setToken(data?.data.access_token);
      //   navigate({
      //     to: search.location,
      //     search,
      //   });
      // } else {
      //   notifications.show({
      //     title: "Опа ошибка!",
      //     message:
      //       "Не пережевайте - это на нашей стороне скоро все будет исправлено",
      //     color: "red",
      //   });
      // }
    },
  });
  return (
    <FormBase title="Вход в систему" fields={registreFormData} form={form} />
  );
};
