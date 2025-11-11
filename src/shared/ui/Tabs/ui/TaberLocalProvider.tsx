import type { ReactNode } from 'react';
import { TaberLocalContext } from '../model/context';
import type { CreateTabStore } from '../types';

export const TaberLocalProvider = ({
  value,
  children,
}: {
  value: CreateTabStore;
  children?: ReactNode;
}) => {
  return <TaberLocalContext {...{ value }}>{children}</TaberLocalContext>;
};
