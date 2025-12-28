import { useEffect, useState } from 'react';
import { useFetchUsersSearch } from './useFetchUsersSearch';
import { searchStoreAction } from '../model/search-store';
import Logger from '@/shared/lib/logger/logger';

/**
 * A feature hook that orchestrates user search functionality.
 * It fetches search results using `useFetchUsersSearch` and updates the global search store.
 * It also manages the visibility of the search results panel.
 *
 * @returns The result of the `useFetchUsersSearch` hook, including fetched data and query status. And also return
 * setQuery fn for change query.
 */
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const { data, dataUpdatedAt, ...rest } = useFetchUsersSearch(query);
  Logger.debug('useSearch.ts', 'response backend', data);
  useEffect(() => {
    if (data && data.length > 0) searchStoreAction.doSetUsers(data);
  }, [dataUpdatedAt, data]);
  return { data, dataUpdatedAt, ...rest, setQuery };
};
