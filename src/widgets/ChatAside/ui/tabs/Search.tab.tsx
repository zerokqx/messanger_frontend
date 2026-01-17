import { Search } from '@/shared/ui/Search';
import { AppShellTaber } from '../../lib/tab';
import { If, Then } from 'react-if';
import { Box } from '@mantine/core';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import Logger from '@/shared/lib/logger/logger';
import { useSelectedSearchUser } from '@/features/selected-user';
import { lazy, Suspense } from 'react';

const ProfileFromSearchUser = lazy(() =>
  import('@/entities/user/ui/ProfileFromSearchUser').then((m) => ({
    default: m.ProfileFromSearchUser,
  }))
);

export const SearchTab = () => {
  const update = useLayoutStore((s) => s.update);
  const users = useSearchStore((s) => s.data);
  const updateSelectedUser = useSelectedSearchUser((s) => s.update);
  Logger.info('Search.tab.tsx', 'users', users);
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
                    layoutAction.doOpenAside({
                      render: (
                        <Suspense fallback={null}>
                          <ProfileFromSearchUser
                            profile={
                              user.profile as components['schemas']['ProfileData']
                            }
                          />
                        </Suspense>
                      ),
                    });
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
