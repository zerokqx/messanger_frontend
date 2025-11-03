import { Button, type ButtonProps } from '@mantine/core';
import { useFormContext } from '../../model';

export const DirtyButton = ({ ...props }: ButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.isDirty]}
      children={([isDirty]) =>
        isDirty && <Button type="submit" {...props}></Button>
      }
    />
  );
};
