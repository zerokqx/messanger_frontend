import type { components } from '@/shared/types/v1';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useSearchStore } from '../model';
import { HorizontalUserCard } from '@/entities/user';
import { lazy } from 'react';
import { MotionStagerList } from '@/shared/ui/motion-stager-list';


const StagerItem = lazy(() =>
  import('@/shared/ui/motion-stager-list').then((m) => ({
    default: m.StagerItem,
  }))
);

export const SearchResultList = () => {
  const selectUser = useSetUuidForRouter();
  const users = useSearchStore((s) => s.data);
  const animationKey = users.map((u) => u.user_id).join(':');

  if (users.length === 0) return;

  return (
      <MotionStagerList key={animationKey} stackProps={{ gap: 'xs' }}>
        {users.map((user) => {
          const profile =
            user.profile as components['schemas']['ProfileByUserIdData'];

          return (
            <StagerItem
              key={user.user_id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                void selectUser(user.user_id);
                layoutAction.doSetAside(true);
              }}
            >
              <HorizontalUserCard value={profile}>
                <HorizontalUserCard.Avatar />
                <HorizontalUserCard.Login />
              </HorizontalUserCard>
            </StagerItem>
          );
        })}
      </MotionStagerList>
  );
};
