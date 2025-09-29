import { Input, type InputProps } from "@mantine/core";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";

export const StrictInput = ({
  field,
  ...props
}: InputProps &
  InputHTMLAttributes<HTMLInputElement> & { field: AnyFieldApi }) => {
  return (
    <Input
      {...props}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
};
