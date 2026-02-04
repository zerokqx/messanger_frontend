import { Stack } from '@mantine/core';
import type { SearchCompouned } from '../types/container.type';
import { Item } from './item';

export const Search: SearchCompouned = ({ children }) => {
  return <Stack>{children}</Stack>;
};
Search.Item = Item;
