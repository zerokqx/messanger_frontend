import { Search } from '@/shared/ui/Search';
import { AppShellTaber } from '../../lib/tab';
import { If, Then } from 'react-if';
import { Box } from '@mantine/core';
import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { asideBusActions } from '@/features/aside/model/aside-bus';
import { ASIDE_BUS_EVENTS } from '@/features/aside';
import { layoutAction } from '@/shared/lib/hooks/useLayout';

export const SearchTab = () => {
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
                    asideBusActions.doNewCommand({
                      type: ASIDE_BUS_EVENTS.USER_SEARCH,
                      data: profile,
                    });

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
