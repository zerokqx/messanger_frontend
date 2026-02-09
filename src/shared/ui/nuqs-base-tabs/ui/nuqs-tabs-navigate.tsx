import { Children, type ReactNode } from 'react';
import { useNuqsTab } from '../lib';
import type { NuqsTabKey } from '../lib/nuqs-tab';
import type { Options } from 'nuqs';

interface NuqsTabsNavigateProps {
  queryKey: NuqsTabKey;
  children: (
    set: (
      value: string | ((old: string) => string | null) | null,
      options?: Options
    ) => Promise<URLSearchParams>
  ) => ReactNode;
}
export const NuqsTabsNavigate = ({
  children,
  queryKey,
}: NuqsTabsNavigateProps) => {
  const [, setTab] = useNuqsTab(queryKey);
  return <div>{children(setTab)}</div>;
};
