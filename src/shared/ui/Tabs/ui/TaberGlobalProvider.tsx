import type { ReactNode } from 'react';
import { TaberGlobalContext } from '../model/context';
import type { CreateTabStore } from '../types';

export const TaberGlobalProvider = ({
  value,
  children,
}: {
  value: CreateTabStore;
  children?: ReactNode;
}) => {
  return <TaberGlobalContext {...{ value }}>{children}</TaberGlobalContext>;
};
