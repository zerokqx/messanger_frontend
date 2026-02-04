import {
  PasswordInput as PasswordInputM,
  type PasswordInputProps,
} from '@mantine/core';
import { useFieldContext } from '../../../model';

export const PasswordInput = ({ ...props }: PasswordInputProps) => {
  const field = useFieldContext<string>();
  return (
    <PasswordInputM
      key={field.name}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => {
        field.handleChange(e.target.value);
      }}
      {...props}
    />
  );
};
