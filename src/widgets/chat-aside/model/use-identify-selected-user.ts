import type { components, paths } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';
import { combinedSelectSearch } from './use-search-union';
import { searchUser } from '../lib/search-user';

export const useIdentifySelectedUser = () => {
  const path: keyof paths = '/user/search' as const;
  const query = combinedSelectSearch.search((s) => s.data.query);
  const uuid = combinedSelectSearch.selectedUser((s) => s.data.user_id);
  const users = useQueryClient().getQueryData<
    components['schemas']['UserSearchResponse']
  >([
    'get',
    path,
    {
      params: {
        query: { query },
      },
    },
  ]);
  if (users) {
    return searchUser(users, uuid);
  }
  return null;
};
