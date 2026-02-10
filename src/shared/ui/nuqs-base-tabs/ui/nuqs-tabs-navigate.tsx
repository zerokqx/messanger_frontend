import { type ReactNode } from 'react';
import { useNuqsTab } from '../lib';
import type { NuqsTabKey } from '../lib/nuqs-tab';
import type { Options } from 'nuqs';

type nuqsTabsNavigateChildren = (
  set: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
) => ReactNode;

interface NuqsTabsNavigateProps {
  queryKey: NuqsTabKey;
  children: nuqsTabsNavigateChildren;
}
export const NuqsTabsNavigate = ({
  children,
  queryKey,
}: NuqsTabsNavigateProps) => {
  const [, set] = useNuqsTab(queryKey);
  return <div>{children(set)}</div>;
};
