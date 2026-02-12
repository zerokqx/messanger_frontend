import type { TabsDeclaration, TabsDeclarationKeys } from '../model';
import { useTabsHistory } from '../model/tabs-history';

export type TabsKey = `t${string}`;

export function useTabs<QueryKey extends TabsDeclarationKeys>(
  queryKey: QueryKey
): TabsDeclaration[QueryKey] {
  const current = useTabsHistory((s) => {
    const client = s.data[queryKey];
    return client
      ? (client.history[
          client.history.length - 1
        ]!)
      : undefined;
  });

  return current!;
}
