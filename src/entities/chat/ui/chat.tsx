import { Stack } from '@mantine/core';
import type { ChatConpouned } from '../types/chat-compouned';
import { Item } from './item';

export const UsersList: ChatConpouned = ({ children }) => {
  return <Stack gap={'md'}>{children}</Stack>;
};

UsersList.Item = Item;
