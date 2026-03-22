import clases from './grouped-list.module.css';
import { factory } from '@mantine/core';
import type { GroupedListProps } from './types';
import { GroupedItem } from './grouped-item';
import { RoundedContainerStack } from '../../boxes';

interface GroupedListFactory {
  props: GroupedListProps;
  ref: HTMLDivElement;
}

const GroupedListRoot = factory<GroupedListFactory>(
  ({ children, ...props }, ref) => {
    
    const items = children?.filter(Boolean);
    if (!items?.length) return null;
    return (
      <RoundedContainerStack
        className={clases.list}
        ref={ref}
        gap={0}
        p={0}
        style={{
          overflow: 'clip',
        }}
        {...props}
      >
        {children}
      </RoundedContainerStack>
    );
  }
);

export const GroupedList = GroupedListRoot as typeof GroupedListRoot & {
  Item: typeof GroupedItem;
};

GroupedList.Item = GroupedItem;
