import { useMemo, type ReactNode } from 'react';
import { useTabs } from '../lib/tabs';
import { tabsHistoryAction } from '../model/tabs-history';
import type { TabsHistoryAction } from '../model';
import {
  SharedQueryNameProvider,
  useSharedQueryName,
} from '../model/querykey-context';
import { ApiTabsProvider, useApiTabs } from '../model/api-context';
import { useEffectOnce } from 'react-use';

type TabComponent = (api: ApiTabsProvider) => ReactNode;

export interface Tab {
  label?: string;
  render: TabComponent;
}

export type TabsObject = Record<string, Tab>;

type TabsPropsChildren = (props: {
  children: ReactNode;
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

export function Tabs({ tabs, tabFallback, children }: TabsProps) {
  const [queryName] = useSharedQueryName();
  const current = useTabs(queryName);
  const _fallback = tabFallback ?? null;
  const [api] = useApiTabs();
  if (!current) return _fallback;

  const tab = tabs[current];
  const content = tab ? tab.render(api) : _fallback;

  if (!children) return <>{content}</>;
  return <>{children({ current, queryName, children: content, tabs })}</>;
}

export const TabsInit = ({
  queryName,
  children,
  initialTab,
}: TabsInitProps) => {
  useEffectOnce(() => {
    tabsHistoryAction.doInitClient(queryName, initialTab);
  });

  const value = useMemo<ApiTabsProvider>(
    () => ({
      push: (v) => {
        tabsHistoryAction.doPush(queryName, v);
      },
      back: () => tabsHistoryAction.doBack(queryName),
    }),
    [queryName]
  );
  //TODO Заменить на один провайдер
  return (
    <ApiTabsProvider initialValue={value}>
      <SharedQueryNameProvider initialValue={queryName}>
        {children}
      </SharedQueryNameProvider>
    </ApiTabsProvider>
  );
};
