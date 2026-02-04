import { Textarea as TextareaM, type TextareaProps } from '@mantine/core';
import { useFieldContext } from '../../../model';
export const TextArea = ({ ...props }: TextareaProps) => {
  const field = useFieldContext<string>();
  return (
    <TextareaM
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
