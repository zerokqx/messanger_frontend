import { createFileRoute } from "@tanstack/react-router";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useEffect, useRef, type FormEvent } from "react";
import { StrictInput } from "@/components";
import { loginFormSchema } from "@/zod/inputForm";
import { notifications } from "@mantine/notifications";
import { Notification } from "@mantine/core";
export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

const lables = {
  userName: "Имя пользователя",
  password: "Пороль",
};

// WARNING: type conversion to lables type.
function FieldInfo({ field }: { field: AnyFieldApi }) {
  const shown = useRef(false);

  if (field.state.meta.errors.length > 0 && !shown.current) {
    const fieldName = field.name as keyof typeof lables;
    const error = field.state.meta.errors.at(-1);

    notifications.show({
      title: lables[fieldName],
      message: typeof error === "string" ? error : error.message,
      color: "red",
      style: { borderRadius: "1rem" },
    });

    shown.current = true;
  }

  // Сбрасывать флаг если ошибок нет, чтоб уведомление могло появиться снова при новых ошибках
  if (field.state.meta.errors.length === 0) {
    shown.current = false;
  }

  return null;
}
function RouteComponent() {
  const form = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },

    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="userName"
        children={(field) => (
          <>
            <label htmlFor={field.name}>Имя пользователя:</label>
            <StrictInput field={field} />
            <FieldInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <>
            <label htmlFor={field.name}>Пароль: </label>
            <StrictInput field={field} />
            <FieldInfo field={field} />
          </>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <>
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
            <button
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                form.reset();
              }}
            >
              Reset
            </button>
          </>
        )}
      />
    </form>
  );
}
