import type { CheckboxProps } from '@mantine/core';
import { Checkbox as CheckboxM } from '@mantine/core';
import { useFieldContext } from '../../../model';

export const Checkbox = ({ onChange, ...props }: CheckboxProps) => {
  const field = useFieldContext<boolean>();
  return (
    <CheckboxM
      checked={field.state.value}
      onChange={(e) => {
        field.handleChange(e.target.checked);
        onChange?.(e);
      }}
      {...props}
    />
  );
};
