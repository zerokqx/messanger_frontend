import { useEffect, useState } from 'react';
import { useFetchUsersSearch } from './use-fetch-users-search';
import { searchStoreAction } from '../model/search-store';
import Logger from '@/shared/lib/logger/logger';
import { createStore, type ZfyMiddlewareType } from '@colorfy-software/zfy';
import { devtools } from 'zustand/middleware';

const zustandMiddleware: ZfyMiddlewareType<any> = (storeName, config) =>
  devtools((set, get, api) => config(set, get, api), { name: storeName });

export const useSearchUserQuery = createStore<string>('search-query', '', {
  customMiddlewares: [zustandMiddleware],
});

/**
 * A feature hook that orchestrates user search functionality.
 * It fetches search results using `useFetchUsersSearch` and updates the global search store.
 * It also manages the visibility of the search results panel.
 *
 * @returns The result of the `useFetchUsersSearch` hook, including fetched data and query status. And also return
 * setQuery fn for change query.
 */
export const useSearch = () => {
  const query = useSearchUserQuery((s) => s.data);
  const { data, dataUpdatedAt, ...rest } = useFetchUsersSearch(query);
  Logger.debug('useSearch.ts', 'response backend', data);
  useEffect(() => {
    if (data && data.length > 0) searchStoreAction.doSetUsers(data);
  }, [dataUpdatedAt, data]);
  return { data, dataUpdatedAt, ...rest };
};
