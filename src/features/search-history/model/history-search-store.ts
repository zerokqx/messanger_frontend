import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { createStore } from '@colorfy-software/zfy';

type RequestType = string;

export const useHistorySearch = createStore<RequestType[]>(
  'latest-requests',
  [],
  { persist: { getStorage: () => localStorage }, log: true }
);

export const historySearchActions = createStoreAction(
  [
    (value: RequestType) => {
      useHistorySearch.setState(({ data }) => ({
        data: [value, ...data.filter((item) => item !== value)].slice(-10),
      }));
    },

    (value: RequestType) => {
      useHistorySearch.setState(({ data }) => ({
        data: data.filter((item) => item !== value),
      }));
    },

    () => {
      useHistorySearch.setState({ data: [] });
    },
  ],
  ['push', 'remove', 'clear']
);
