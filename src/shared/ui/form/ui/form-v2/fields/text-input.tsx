import { TextInput as TextInputM, type TextInputProps } from '@mantine/core';
import { useFieldContext } from '../../../model';
export const TextInput = ({ ...props }: TextInputProps) => {
  const field = useFieldContext<string>();
  return (
    <TextInputM
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
