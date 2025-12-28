import { Search } from '@/shared/ui/Search';
import { AppShellTaber } from '../../lib/tab';
import { If, Then } from 'react-if';
import { Box } from '@mantine/core';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { selectedUserActions } from '@/shared/model/stores/selected-user';
import { useSearchCache, useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { useLogger } from '@mantine/hooks';
import { searchStoreAction } from '@/features/search/model/search-store';

export const SearchTab = () => {
  const update = useLayoutStore((s) => s.update);
  const users = useSearchStore((s) => s.data);
  return (
    <AppShellTaber.Panel value="search">
      <If condition={users?.length ?? 0}>
        <Then>
          <Search>
            {users?.map((user) => {
              const profile =
                user.profile as components['schemas']['ProfileByUserIdData'];
              const login = profile.login ?? 'Anonymous';
              return (
                <Box
                  style={{ cursor: 'pointer' }}
                  key={user.user_id}
                  onClick={() => {
                    update((s) => (s.asside = true));
                    selectedUserActions.doSelect(user);
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
