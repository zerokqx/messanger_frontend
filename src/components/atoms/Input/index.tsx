import { Input, useMantineTheme, type InputProps } from "@mantine/core";
import type { createFormHookContexts } from "@tanstack/react-form";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { fi } from "zod/v4/locales";

export const StrictInput = ({
  contextHook,
  styles,
  ...props
}: InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    contextHook: ReturnType<typeof createFormHookContexts>["useFieldContext"];
  }) => {
  const [er, setEr] = useState<{
    short: string;
    full: string;
  } | null>(null);
  const theme = useMantineTheme();
  const field = contextHook();
  useEffect(() => {
    const errorList = field.state.meta.errors;
    if (errorList.length > 0) {
      const error = errorList.at(-1).message as string;
      const short = error.slice(0, 32) + "...";
      setEr({
        short,
        full: error,
      });
      setTimeout(() => {
        setEr(null);
      }, 6e3);
    }
  }, [field.state.meta.errors]);
  return (
    <Input.Wrapper  w="max-content" error={er ? er.full : ""}>
      <Input
        {...props}
        styles={{
          input: {
            backgroundColor: theme.black,
            border: `1px ${theme.white} solid `,
            width: "20rem",
            height: "2rem",
            color: theme.white,
          },
        }}
        id={field.name}
        name={field.name}
        value={String(field.state.value ?? "")}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </Input.Wrapper>
  );
};
