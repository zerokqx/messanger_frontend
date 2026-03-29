import { border } from '@/shared/lib/css-utils';
import { lightDark } from '@/shared/lib/light-dark';
import { Grid, Group, Stack } from '@mantine/core';

const props = {

  bdrs: 'xl',
  p: 'xs',
  bg: lightDark('gray.0', 'dark.8'),
  bd: border('1px', 'solid', lightDark('gray.3', 'gray.9')),
}
export const RoundedContainerStack = Stack.withProps(props);
export const RoundedContainerGroup = Group.withProps(props);
export const RoundedContainerGrid = Grid.withProps(props)
