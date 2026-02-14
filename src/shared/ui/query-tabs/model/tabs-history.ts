import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { createStore } from '@colorfy-software/zfy';
import type { TabsDeclaration, TabsDeclarationKeys } from './tabs-types';

interface TabsHistoryClient {
  history: [string, ...string[]];
  current: string;
}

export type TabsHistoryState = Partial<Record<string, TabsHistoryClient>>;

export const useTabsHistory = createStore<TabsHistoryState>(
  'tabs-history',
  {},
  { log: true }
);

function getClientOrThrow(
  state: { data: TabsHistoryState },
  queryName: string
): TabsHistoryClient {
  const client = state.data[queryName];
  if (!client) {
    throw new Error(
      `[tabsHistory] Client not initialized for key "${queryName}". Call initClient first.`
    );
  }
  return client;
}

export const tabsHistoryAction = createStoreAction(
  [
    (queryName: string, initial: string) => {
      useTabsHistory.setState((s) => {
        if (s.data[queryName]) return;
        s.data[queryName] = { history: [initial], current: initial };
      });
    },

    (queryName: string) => {
      let nextCurrent: string | undefined;

      useTabsHistory.setState((s) => {
        const client = getClientOrThrow(s, queryName);

        if (client.history.length === 1) return;

        client.history.pop();

        nextCurrent = client.history[client.history.length - 1];
        if (nextCurrent) client.current = nextCurrent;
      });

      return nextCurrent;
    },

    (queryKey: string, to: string) => {
      useTabsHistory.setState((s) => {
        const client = getClientOrThrow(s, queryKey);
        if (client.history.length > import.meta.env.VITE_TABS_MAX) {
          client.history.splice(
            0,
            client.history.length - import.meta.env.VITE_TABS_MAX
          );
        }
        const current = client.history[client.history.length - 1];
        if (current === to) return;

        client.current = to;
        client.history.push(to);
      });
    },
  ],

  ['initClient', 'back', 'push']
);

export type TabsHistoryAction = typeof tabsHistoryAction;
