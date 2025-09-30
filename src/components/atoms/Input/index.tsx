import { Input, type InputProps } from "@mantine/core";
import type { createFormHookContexts } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";

export const StrictInput = ({
  contextHook,
  ...props
}: InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    contextHook: ReturnType<typeof createFormHookContexts>["useFieldContext"];
  }) => {
  const field = contextHook();
  console.log(field.state.value);
  return (
    <Input
      {...props}
      id={field.name}
      name={field.name}
      value={String(field.state.value)}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
};
