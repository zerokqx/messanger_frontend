import { Button } from "@/components";
import type { createFormHookContexts } from "@tanstack/react-form";

export function SubscribeButton({
  label,
  useFormContext,
}: {
  label: string;
  useFormContext: ReturnType<typeof createFormHookContexts>["useFormContext"];
}) {
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
