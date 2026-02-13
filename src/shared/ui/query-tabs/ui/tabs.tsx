import type Resources from '@/shared/i18next/types/resources';
import { type ReactNode } from 'react';
import { useEffectOnce } from 'react-use';
import { useTabs } from '../lib/tabs';
import { tabsHistoryAction } from '../model/tabs-history';
import type {
  TabsDeclaration,
  TabsDeclarationKeys,
  TabsHistoryAction,
} from '../model';

type TabsTabComponent = (api: TabsHistoryAction) => ReactNode;

type TabDef =
  | {
      render: TabsTabComponent;
    }
  | {
      render: ReactNode;
    };

export type TabsTab<I18N extends keyof Resources> = (
  | {
      label: string;
    }
  | {
      i18n: keyof Resources[I18N];
    }
) &
  TabDef;
export type TabsObject<
  QueryKey extends TabsDeclarationKeys,
  I18N extends keyof Resources,
> = Record<TabsDeclaration[QueryKey], TabsTab<I18N>>;

type TabsPropsChildren<
  QueryKey extends TabsDeclarationKeys,
  W extends TabsObject<QueryKey, I18N>,
  I18N extends keyof Resources,
> = ({
  current,
  queryName,
  tabs,
}: {
  current: TabsDeclaration[QueryKey];
  queryName: QueryKey;
  tabs: W;
}) => ReactNode;

interface TabsProps<
  QueryKey extends TabsDeclarationKeys,
  W extends TabsObject<QueryKey, I18N>,
  I18N extends keyof Resources,
> {
  i18nGroup: I18N;
  queryName: QueryKey;
  tabs: W;
  perTab?: (props: { current: TabsDeclaration[QueryKey] }) => ReactNode;
  wrapper?: (props: { children?: ReactNode; current: keyof W }) => ReactNode;
  children?: TabsPropsChildren<QueryKey, W, I18N>;
}

interface TabsInitProps<QueryKey extends TabsDeclarationKeys> {
  children?: ReactNode;
  queryKey: QueryKey;
  initialTab: TabsDeclaration[QueryKey];
}

//=====================================================================//

export function Tabs<
  QueryKey extends TabsDeclarationKeys,
  W extends TabsObject<QueryKey, I18N>,
  I18N extends keyof Resources,
>({
  queryName,
  tabs,
  perTab,
  wrapper = ({ children }) => children,
  children = ({ current, tabs }) => {
    const tab = tabs[current as keyof typeof tabs];
    const { render } = tab;
    return typeof render === 'function' ? render(tabsHistoryAction) : render;
  },
}: TabsProps<QueryKey, W, I18N>) {
  const current = useTabs(queryName);
  const Wrapper = wrapper;

  return (
    <>
      {perTab?.({ current })}
      <Wrapper current={current}>
        {children({ current, queryName, tabs })}
      </Wrapper>
    </>
  );
}

export const TabsInit = <QueryKey extends TabsDeclarationKeys>({
  queryKey,
  children,
  initialTab,
}: TabsInitProps<QueryKey>) => {
  useEffectOnce(() => {
    tabsHistoryAction.doInitClient(queryKey, initialTab);
  });
  return children;
};
