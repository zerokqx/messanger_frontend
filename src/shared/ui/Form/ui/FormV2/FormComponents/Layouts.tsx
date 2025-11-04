import { Group, Stack } from '@mantine/core';

const Vertical = Stack.withProps({
  gap: 'md',
});
const Horizontal = Group.withProps({
  grow: true,
  justify: 'space-between',
  gap: 'md',
  wrap: 'wrap',
});
export const Layouts = {
  Vertical,
  Horizontal,
};
