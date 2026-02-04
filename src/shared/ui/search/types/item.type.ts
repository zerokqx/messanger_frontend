import type { AvatarProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { SearchContainerProp } from './container.type';

export interface SearchItemAvatarProp {
  avatar?: AvatarProps;
}

export interface SearchItemProp extends SearchItemAvatarProp {
  leftSide?: ReactNode;
  rightSide?: ReactNode;
  text?: string;
}
