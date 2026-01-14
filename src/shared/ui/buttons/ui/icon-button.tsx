import { Button, ThemeIcon } from '@mantine/core';
import type { IIconButtonProps } from './types/icon-button.types';

export const IconButton = ({
  leftSection,
  themeIconProps,
  ...props
}: IIconButtonProps) => {
  return (
    <Button
      color="#fff"
      justify="start"
      bdrs={'sm'}
      pt={'xs'}
      pb={'xs'}
      leftSection={
        leftSection && <ThemeIcon {...themeIconProps}>{leftSection}</ThemeIcon>
      }
      variant="subtle"
      h={'max-content'}
      {...props}
    />
  );
};
