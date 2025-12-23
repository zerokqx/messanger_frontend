import { useSearchStore } from '../model/useSearchStore';
import { useEffect } from 'react';
import { useFetchUsersSearch } from './useFetchUsersSearch';

/**
 * A feature hook that orchestrates user search functionality.
 * It fetches search results using `useFetchUsersSearch` and updates the global search store.
 * It also manages the visibility of the search results panel.
 * @returns The result of the `useFetchUsersSearch` hook, including fetched data and query status.
 */
export const useSearch = () => {
  const updateSearch = useSearchStore((s) => s.update);
  const query = useSearchStore((s) => s.data.query);
  const { data, ...rest } = useFetchUsersSearch(query);
  useEffect(() => {
    if (data) {
      updateSearch((s) => (s.users = data));
    }
  }, [data, updateSearch]);

  return { data, ...rest };
};
