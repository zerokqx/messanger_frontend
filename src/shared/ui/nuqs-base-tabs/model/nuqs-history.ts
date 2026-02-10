import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { createStore } from '@colorfy-software/zfy';

interface NuqsHistoryItem {
  history: string[];
}
export type NuqsHistoryState = Record<string, NuqsHistoryItem>;

export const useNuqsHistory = createStore<NuqsHistoryState>(
  'nuqs-tabs-history',
  {},
  { log: true }
);

const nuqsHistoryAction = createStoreAction([() => {}]);
