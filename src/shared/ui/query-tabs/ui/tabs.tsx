import React, { useCallback, useMemo, type ReactNode } from 'react';
import { useTabs } from '../lib/tabs';
import { tabsHistoryAction } from '../model/tabs-history';
import type {
  TabsDeclaration,
  TabsDeclarationKeys,
  TabsHistoryAction,
} from '../model';
import {
  SharedQueryNameProvider,
  useSharedQueryName,
} from '../model/querykey-context';
import { useDefault } from 'react-use';

type TabComponent = (api: TabsHistoryAction) => ReactNode;

export interface Tab {
  label?: string;
  render: TabComponent;
}

export type TabsObject = Record<string, Tab>;

type TabsPropsChildren = (props: {
  resolve: () => ReactNode;
  current: string;
  queryName: string;
  tabs: TabsObject;
}) => ReactNode;

interface TabsProps {
  tabs: TabsObject;
  children?: TabsPropsChildren;
  tabFallback?: ReactNode;
}

interface TabsInitProps {
  children?: ReactNode;
  queryName: string;
  initialTab: string;
}

//=====================================================================//

const resolveChildren = (
  children: TabsObject,
  current: string,
  api: TabsHistoryAction,
  fallback?: ReactNode
) => {
  return () => {
    const tab = children[current];
    if (tab) return tab.render(api);
    return fallback;
  };
};
export function Tabs({ tabs, tabFallback, children }: TabsProps) {
  const [queryName] = useSharedQueryName();

  console.log(queryName);
  const current = useTabs(queryName);
  const _children: TabsPropsChildren =
    children ??
    (({ tabs: _tabs, current: _current }) => {
      const tab = _tabs[_current];
      return tab ? tab.render(tabsHistoryAction) : tabFallback;
    });

  const tab = tabs[current];
  if (!tab) return tabFallback;
  const content = _children({
    current,
    queryName,
    tabs,
    resolve: resolveChildren(tabs, current, tabsHistoryAction, tabFallback),
  });
  return content;
}

export const TabsInit = ({
  queryName,
  children,
  initialTab,
}: TabsInitProps) => {
  useMemo(() => {
    tabsHistoryAction.doInitClient(queryName, initialTab);
  }, [queryName, initialTab]);

  return (
    <SharedQueryNameProvider initialValue={queryName}>
      {children}
    </SharedQueryNameProvider>
  );
};
