import {
  Input,
  TextInput,
  useMantineTheme,
  type TextInputProps,
} from "@mantine/core";
import type { createFormHookContexts } from "@tanstack/react-form";
import { useEffect, useState, type InputHTMLAttributes } from "react";

export const StrictInput = ({
  contextHook,
  styles,
  ...props
}: TextInputProps &
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
    <Input.Wrapper w="max-content" error={er ? er.full : ""}>
      <TextInput
        {...props}
        w={"20rem"}
        h="2rem"
        c={"white"}
        bd={`1px ${theme.white} solid `}
        styles={{
          input: {
            backgroundColor: theme.black,
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
