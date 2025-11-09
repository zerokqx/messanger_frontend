import { useSearchStore } from '../model/useSearchStore';
import { useEffect } from 'react';
import { useLogger } from 'react-use';
import { useFetchUsersSearch } from './useFetchUsersSearch';

/**
 * A feature hook that orchestrates user search functionality.
 * It fetches search results using `useFetchUsersSearch` and updates the global search store.
 * It also manages the visibility of the search results panel.
 * @returns The result of the `useFetchUsersSearch` hook, including fetched data and query status.
 */
export const useSearch = () => {
  const setUsers = useSearchStore.useSetUsers();
  const setOpened = useSearchStore.useSetOpened();
  const query = useSearchStore((s) => s.queryForSearch);

  const { data, ...rest } = useFetchUsersSearch(query);
  useLogger('Search', { query });

  useEffect(() => {
    if (data) {
      setUsers(data);
      setOpened(true);
    }
  }, [data, setUsers, setOpened]);

  return { data, ...rest };
};
