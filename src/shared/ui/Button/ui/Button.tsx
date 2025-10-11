import { Button as ButtonMantine } from '@mantine/core';
import type { CustomButtonProps } from '../types';
export const CustomMantineButton = ({
  children,

  ...props
}: CustomButtonProps) => {
  return (
    <ButtonMantine {...props} bdrs={'xl'} bg={'dark'}>
      {children}
    </ButtonMantine>
  );
};
