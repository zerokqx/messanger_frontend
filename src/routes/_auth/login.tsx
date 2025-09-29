import { createFileRoute } from "@tanstack/react-router";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useEffect, useRef, type FormEvent } from "react";
import { FieldInfo, StrictInput } from "@/components";
import { loginFormSchema } from "@/zod/inputForm";
import { notifications } from "@mantine/notifications";
import { Notification } from "@mantine/core";
export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },

    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      className="flex flex-col max-w-[40rem] gap-2"
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
            <StrictInput field={field} placeholder="Имя пользователя" />
            <FieldInfo label="Имя пользователя" field={field} />
          </>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <>
            {/* <label htmlFor={field.name}>Пароль: </label> */}
            <StrictInput type="password" field={field} placeholder="Пороль" />
            <FieldInfo field={field} label="Пороль" />
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
