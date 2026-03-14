import { Button} from '@mantine/core';
import type { IIconButtonProps } from './types/icon-button.types';
import { lightDark } from '@/shared/lib/light-dark';

export const IconButton = ({ leftSection, ...props }: IIconButtonProps) => {
  return (
    <Button
      color={lightDark('gray.9','gray.1')}
      justify="start"
      bdrs={'sm'}
      p={'0'}
      pl={'md'}
      pt={'xs'}
      pb={'xs'}
      leftSection={leftSection}
      variant="subtle"
      h={'max-content'}
      {...props}
    />
  );
};
