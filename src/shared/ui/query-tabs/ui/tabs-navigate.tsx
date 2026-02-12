import { type ReactNode } from 'react';
import { useTabs } from '../lib';
import { tabsHistoryAction } from '../model/tabs-history';
import type { TabsDeclaration, TabsDeclarationKeys } from '../model';
import { Box } from '@mantine/core';

type TabsNavigateChildren<QueryKey extends TabsDeclarationKeys> = (
  actions: {
    back: () => TabsDeclaration[QueryKey] | undefined;
    push: (to: TabsDeclaration[QueryKey]) => void;
  },
  current: TabsDeclaration[QueryKey]
) => ReactNode;

interface TabsNavigateProps<QueryKey extends TabsDeclarationKeys> {
  queryKey: QueryKey;
  children: TabsNavigateChildren<QueryKey>;
}
export const TabsNavigate = <QueryKey extends TabsDeclarationKeys>({
  children,
  queryKey,
}: TabsNavigateProps<QueryKey>) => {
  const current = useTabs(queryKey);
  const actions = {
    back: () => tabsHistoryAction.doBack(queryKey),
    push: (to: TabsDeclaration[QueryKey]) =>
      { tabsHistoryAction.doPush(queryKey, to); },
  };

  return <Box>{children(actions, current)}</Box>;
};
