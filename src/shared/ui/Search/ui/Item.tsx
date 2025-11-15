import { Avatar, Grid, Group, Text, useProps } from '@mantine/core';
import type { SearchItemProp } from '../types/item.type';
export function Item(props: SearchItemProp) {
  const defaultProps: SearchItemProp = {
    leftSide: <Avatar bg={'blue'} name="Name" {...props.avatar} />,
    text: 'Search Text',
  };
  const { leftSide, rightSide, text } = useProps<SearchItemProp>(
    'SearchItem',
    defaultProps,
    props
  );
  return (
    <Group>
      <Group wrap="nowrap">
        {leftSide}
        <Text truncate="end" w={'inherit'}>
          {text}
        </Text>
        {rightSide}
      </Group>
    </Group>
  );
}
