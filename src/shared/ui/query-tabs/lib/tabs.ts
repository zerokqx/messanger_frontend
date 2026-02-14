import { useTabsHistory } from '../model/tabs-history';

export function useTabs(queryName: string): string | undefined {
  const current = useTabsHistory((s) => s.data[queryName]?.current);
  return current;
}
