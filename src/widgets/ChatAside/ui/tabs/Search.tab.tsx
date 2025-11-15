import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { Search } from '@/shared/ui/Search';
import { useLogger } from 'react-use';
import { AppShellTaber, useTabAppShell } from '../../lib/tab';
import { Link } from '@tanstack/react-router';
import { NotData } from '@/shared/ui/Errors';
import { Else, If, Then, When } from 'react-if';

export const SearchTab = () => {
  const users = useSearchStore.useUsers();
  const query = useSearchStore.useQueryForSearch();
  const dirty = useSearchStore.useDirty();
  const set = useTabAppShell.useSetCurrentTab();
  useLogger('SearchWindow');
  return (
    <AppShellTaber.Panel value="search">
      <If condition={users && users.length > 0}>
        <Then>
          <Search>
            {users?.map((user) => {
              const profile =
                user.profile as components['schemas']['ProfileByUserIdData'];
              const login = profile.login ?? 'Anonymous';
              return (
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  search={{
                    query,
                    uuid: user.user_id,
                  }}
                  to="/search/user"
                  key={user.user_id}
                  onClick={() => {
                    set('profile');
                  }}
                >
                  <Search.Item
                    text={login}
                    avatar={{
                      name: login,
                    }}
                  />
                </Link>
              );
            })}
          </Search>
        </Then>
        <Else>
          <When condition={dirty}>
            <NotData text="Ничго не найдено" />
          </When>
        </Else>
      </If>
    </AppShellTaber.Panel>
  );
};
