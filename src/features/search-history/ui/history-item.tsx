import { ActionIcon, Group, Text } from '@mantine/core';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { historySearchActions } from '../model';

export interface SearchHistoryItemPorps {
  children?: string;
  onClick?: (v: string) => void;
}
export const HistoryItem = ({ onClick, children }: SearchHistoryItemPorps) => {
  return (
    <Group
      mt={'xs'}
      mb={'xs'}
      onClick={() => {
        onClick?.(children ?? '');
      }}
    >
      <ActionIcon
        style={{ zIndex: '10000' }}
        color="gray"
        onClick={(e) => {
          e.stopPropagation();
          historySearchActions.doRemove(children ?? '');
        }}
        bdrs={'xl'}
        variant="transparent"
      >
        <X />
      </ActionIcon>
      <Text>{children}</Text>
    </Group>
  );
};
