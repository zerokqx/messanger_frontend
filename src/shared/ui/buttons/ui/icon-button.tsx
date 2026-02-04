import { alpha, Button, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import type { IIconButtonProps } from './types/icon-button.types';

export const IconButton = ({
  leftSection,
  themeIconProps,
  ...props
}: IIconButtonProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Button
      color={colorScheme === 'dark' ? 'white' : 'black'}
      justify="start"
      bdrs={'sm'}
      pt={'xs'}
      pb={'xs'}
      leftSection={leftSection}
      variant="subtle"
      h={'max-content'}
      {...props}
    />
  );
};
