import { Search } from '@/shared/ui/Search';
import { AppShellTaber } from '../../lib/tab';
import { If, Then } from 'react-if';
import {
  combinedSelectSearch,
  useCombinedSelectSearch,
} from '../../model/useSearchUnion';
import { Box } from '@mantine/core';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';

export const SearchTab = () => {
  const selectedUser = combinedSelectSearch.selectedUser.setState;
  const users = useCombinedSelectSearch('search', (s) => s.users);
  const update = useLayoutStore((s) => s.update);
  return (
    <AppShellTaber.Panel value="search">
      <If condition={users?.length ?? 0}>
        <Then>
          <Search>
            {users?.map((user) => {
              const profile = user.profile;
              const login = profile.login ?? 'Anonymous';
              return (
                <Box
                  style={{ cursor: 'pointer' }}
                  key={user.user_id}
                  onClick={() => {
                    update((s) => (s.asside = true));
                    selectedUser({ data: user });
                  }}
                >
                  <Search.Item
                    text={login}
                    avatar={{
                      name: login,
                    }}
                  />
                </Box>
              );
            })}
          </Search>
        </Then>
      </If>
    </AppShellTaber.Panel>
  );
};
