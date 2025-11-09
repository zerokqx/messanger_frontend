import { Stack } from '@mantine/core';
import type { ChatConpouned } from '../types/ChatCompouned';
import { Item } from './Item';

export const UsersList: ChatConpouned = ({ children }) => {
  return <Stack gap={'md'}>{children}</Stack>;
};

UsersList.Item = Item;
