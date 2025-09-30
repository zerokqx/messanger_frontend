import { Button, StrictInput } from "@/components";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/test")({
  component: RouteComponent,
});
export const {
  useFormContext,
  fieldContext: fieldContextLogin,
  formContext: formContextLogin,
  useFieldContext,
} = createFormHookContexts();
function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          onClick={() => form.handleSubmit()}
          type="submit"
          disabled={isSubmitting}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

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

  props: {
    title: "Child Form",
  },
  render: function Render({ form, title }) {
    return (
      <div>
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
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    );
  },
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
  return <ChildForm form={form} title="Hello world" />;
}
