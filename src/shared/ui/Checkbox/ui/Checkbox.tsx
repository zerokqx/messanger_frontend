import type { CheckboxProps } from '@mantine/core';
import { Checkbox as CheckboxMantine } from '@mantine/core';
export const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
    <CheckboxMantine
      styles={{
        input: {
          border: 'none',
          borderRadius: '0px',
          background: 'white',
        },
        icon: {
          color: 'black',
        },
      }}
      {...props}
    />
  );
};
