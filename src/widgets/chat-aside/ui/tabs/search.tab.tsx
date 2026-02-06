import { Search } from '@/shared/ui/search';
import { AppShellTaber } from '../../lib/tab';
import { If, Then } from 'react-if';
import { Box } from '@mantine/core';
import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';

export const SearchTab = () => {
  const selectUser = useSetUuidForRouter();
  const users = useSearchStore((s) => s.data);
  return (
    <AppShellTaber.Panel value="search">
      <If condition={users.length > 0}>
        <Then>
          <Search>
            {users.map((user) => {
              const profile =
                user.profile as components['schemas']['ProfileByUserIdData'];
              const login = profile.login ?? 'Anonymous';
              return (
                <Box
                  style={{ cursor: 'pointer' }}
                  key={user.user_id}
                  onClick={() => {
                    void selectUser(user.user_id);
                    layoutAction.doSetAside(true);
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
