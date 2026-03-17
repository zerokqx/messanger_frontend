import type { GroupProps, MantineColor, StackProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface GroupedListProps extends StackProps {
  children?: ReactNode[];
}

export interface GroupedItemProps extends GroupProps {
  leftSectionColor?: MantineColor;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  isText?:boolean
  fallback?: ReactNode
  undefinedStyles?: boolean
  label?: string;
}
export interface GroupedListComponent {
  (props: GroupedListProps): ReactNode;
  Item: (props: GroupedItemProps) => ReactNode;
}
