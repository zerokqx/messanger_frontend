import { type ReactNode } from 'react';
import { useTabs } from '../lib';
import { tabsHistoryAction } from '../model/tabs-history';
import { Box } from '@mantine/core';

type TabsNavigateChildren = (
  actions: {
    back: () => void;
    push: (to: string) => void;
  },
  current: string
) => ReactNode;

interface TabsNavigateProps {
  queryName: string;
  children: TabsNavigateChildren;
}
export const TabsNavigate = ({ children, queryName }: TabsNavigateProps) => {
  const current = useTabs(queryName);
  const actions = {
    back: () => tabsHistoryAction.doBack(queryName),
    push: (to: string) => {
      tabsHistoryAction.doPush(queryName, to);
    },
  };

  return <Box>{children(actions, current)}</Box>;
};
