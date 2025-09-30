import { Input, useMantineTheme, type InputProps } from "@mantine/core";
import type { createFormHookContexts } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";

export const StrictInput = ({
  contextHook,
  ...props
}: InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    contextHook: ReturnType<typeof createFormHookContexts>["useFieldContext"];
  }) => {
  const theme = useMantineTheme();
  const field = contextHook();
  return (
    <Input
      {...props}
      styles={{
        input: {
          backgroundColor: theme.black,
          border: `1px ${theme.white} solid `,
          color: theme.white,
        },
      }}
      id={field.name}
      name={field.name}
      value={String(field.state.value ?? "")}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
};
