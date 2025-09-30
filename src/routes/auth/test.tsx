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
          type=""
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
    firstName: "",
    lastName: "",
  },

  props: {
    title: "Child Form",
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.StrictInput contextHook={useFieldContext} />
          )}
        />
        <form.AppForm>
          <form.SubscribeButton label="" />
        </form.AppForm>
      </div>
    );
  },
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return <ChildForm form={form} title="Hello world" />;
}
