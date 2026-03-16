import { Button } from '@mantine/core';
import { lightDark } from '@/shared/lib/light-dark';

export const IconButton = Button.withProps({
  color: lightDark('gray.8', 'gray.4'),
  justify: 'start',
  p: '0',
  pl: 'md',
  pt: 'xs',
  pb: 'xs',
  variant: 'subtle',
  h: 'max-content',
});
