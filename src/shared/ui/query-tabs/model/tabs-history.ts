import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { createStore } from '@colorfy-software/zfy';
import type { TabsDeclaration, TabsDeclarationKeys } from './tabs-types';

type TabsHistoryClient<K extends TabsDeclarationKeys> = {
  history: [TabsDeclaration[K], ...TabsDeclaration[K][]];
};

export type TabsHistoryState = Partial<{
  [K in TabsDeclarationKeys]: TabsHistoryClient<K>;
}>;

export const useTabsHistory = createStore<TabsHistoryState>(
  'tabs-history',
  {},
  { log: true }
);

function getClientOrThrow<K extends TabsDeclarationKeys>(
  state: { data: TabsHistoryState },
  queryKey: K
): TabsHistoryClient<K> {
  const client = state.data[queryKey];
  if (!client) {
    throw new Error(
      `[tabsHistory] Client not initialized for key "${String(queryKey)}". Call initClient first.`
    );
  }
  return client as TabsHistoryClient<K>;
}

export const tabsHistoryAction = createStoreAction(
  [
    <QueryKey extends TabsDeclarationKeys>(
      queryKey: QueryKey,
      initial: TabsDeclaration[QueryKey]
    ) => {
      useTabsHistory.setState((s) => {
        if (s.data[queryKey]) return;

        s.data[queryKey] = { history: [initial] };
      });
    },

    (queryKey: TabsDeclarationKeys) => {
      let nextCurrent: string | undefined;

      useTabsHistory.setState((s) => {
        const client = getClientOrThrow(s, queryKey);

        if (client.history.length === 1) return;

        client.history.pop();

        nextCurrent = client.history[client.history.length - 1];
      });

      return nextCurrent;
    },

    <QueryKey extends TabsDeclarationKeys>(
      queryKey: QueryKey,
      to: TabsDeclaration[QueryKey]
    ) => {
      useTabsHistory.setState((s) => {
        const client = getClientOrThrow(s, queryKey);
        if (client.history.length > import.meta.env.VITE_TABS_MAX) {
          client.history.splice(
            0,
            client.history.length - import.meta.env.VITE_TABS_MAX
          );
        }
        console.log(client.history);
        const current = client.history[client.history.length - 1];
        if (current === to) return;

        client.history.push(to);
      });
    },
  ],
  ['initClient', 'back', 'push']
);

export type TabsHistoryAction = typeof tabsHistoryAction;
