import type { SelectProps } from '@mantine/core';
import { useFieldContext } from '../../model';
import { Select as SelectM } from '@mantine/core';
export const Select = ({ onChange, ...props }: SelectProps) => {
  const field = useFieldContext<string>();
  return (
    <SelectM
      onChange={(value, option) => {
        if (value) {
          field.handleChange(value);
          onChange?.(value, option);
        }
      }}
      value={field.state.value}
      {...props}
    />
  );
};
