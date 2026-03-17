import { Divider, factory } from '@mantine/core';
import type { GroupedListProps } from './types';
import { Fragment } from 'react';
import { GroupedItem } from './grouped-item';
import { RoundedContainerStack } from '../../boxes';

interface GroupedListFactory {
  props: GroupedListProps;
  ref: HTMLDivElement;
}

const GroupedListRoot = factory<GroupedListFactory>(
  ({ children, ...others }, ref) => {
   const items = children?.filter(Boolean);

    if (!items?.length) return null;

    return (
      <RoundedContainerStack ref={ref} p="sm" {...others}>
        {items.map((child, i) => (
          <Fragment key={i}>
            {child}
            {i < items.length - 1 && <Divider opacity={0.5} />}
          </Fragment>
        ))}
      </RoundedContainerStack>
    );
  }
);

export const GroupedList = GroupedListRoot as typeof GroupedListRoot & {
  Item: typeof GroupedItem;
};

GroupedList.Item = GroupedItem;
