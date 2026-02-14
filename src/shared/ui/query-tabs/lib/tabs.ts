import { useTabsHistory } from '../model/tabs-history';

export type TabsKey = `t${string}`;

export function useTabs(queryName: string): string {
  const current = useTabsHistory((s) => {
    if (queryName in s.data) {
      const client = s.data[queryName];
      return client ? client.history[client.history.length - 1] : undefined;
    }
  });
  if (!current) throw new Error('History client not find');
  return current;
}
