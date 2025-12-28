import { useState } from 'react';
import { useFetchUsersSearch } from './useFetchUsersSearch';

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
  const { data, ...rest } = useFetchUsersSearch(query);
  return { data, ...rest, setQuery };
};
