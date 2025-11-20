import type { components } from '@/shared/types/v1';
import { Search } from '@/shared/ui/Search';
import { AppShellTaber, useTabAppShell } from '../../lib/tab';
import { Link } from '@tanstack/react-router';
import { Else, If, Then, When } from 'react-if';
import { combinedSelectSearch } from '../../model/useSearchUnion';
import { Box } from '@mantine/core';

export const SearchTab = () => {
  const selectedUser = combinedSelectSearch.selectedUser.setState;
  const { users, query } = combinedSelectSearch.search((s) => ({
    users: s.data.users,
    query: s.data.query,
  }));
  const set = useTabAppShell.useSetCurrentTab();
  return (
    <AppShellTaber.Panel value="search">
      <If condition={users && users.length > 0}>
        <Then>
          <Search>
            {users?.map((user) => {
              if (!user.profile) return;
              const profile =
                user.profile as components['schemas']['ProfileByUserIdData'];
              const login = profile.login ?? 'Anonymous';
              return (
                <Box
                  style={{ cursor: 'pointer' }}
                  key={user.user_id}
                  onClick={() => {
                    selectedUser({ data: user });
                    set('profile');
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
        <Else>
          {/* <When condition={dirty}> */}
          {/*   <NotData text="Ничго не найдено" /> */}
          {/* </When> */}
        </Else>
      </If>
    </AppShellTaber.Panel>
  );
};
