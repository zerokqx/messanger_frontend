import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { NotData } from '@/shared/ui/Errors';
import { Search } from '@/shared/ui/Search';
import { createLink, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useLogger } from 'react-use';

export const SearchWindow = () => {
  const { t } = useTranslation('navBar');
  const users = useSearchStore.useUsers();
  const dirty = useSearchStore.useDirty();
  useLogger('SearchWindow');

  return users && users.length > 0 ? (
    <Search>
      {users.map((user) => {
        const profile =
          user.profile as components['schemas']['ProfileByUserIdData'];
        const login = profile.login ?? 'Anonymous';
        return (
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="."
            hash={user.user_id}
            key={user.user_id}
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
  ) : (
    dirty && <NotData text="Ничего не нашлось" />
  );
};
