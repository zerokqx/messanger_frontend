import type Resources from '@/shared/i18next/types/resources';
import type { ReactNode } from 'react';
import { useNuqsTab, type NuqsTabKey } from '../lib/nuqs-tab';

export type NuqsTabsTab<I18N extends keyof Resources> =
  | {
      label: string;
      component: ReactNode;
    }
  | {
      component: ReactNode;
      i18n: keyof Resources[I18N];
    };

interface NuqsTabsProps<
  W extends Record<string, NuqsTabsTab<I18N>>,
  I18N extends keyof Resources,
> {
  i18nGroup: I18N;
  queryName: NuqsTabKey;
  tabs: W;
  children?: ({
    currentTab,
    tabs,
  }: {
    currentTab: string;
    queryName: string;
    tabs: W;
  }) => ReactNode;
  initialTab: keyof W;
}

export function NuqsTabs<
  W extends Record<string, NuqsTabsTab<I18N>>,
  I18N extends keyof Resources,
>({ queryName, children, initialTab, tabs }: NuqsTabsProps<W, I18N>) {
  const [curr] = useNuqsTab(queryName, initialTab as string);

  return children
    ? children({ currentTab: curr, tabs, queryName })
    : tabs[curr]?.component;
}
