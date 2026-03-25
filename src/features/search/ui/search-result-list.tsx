import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useSearchStore } from '../model';
import { HorizontalUserCard } from '@/entities/user';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { Virtuoso } from 'react-virtuoso';

export const SearchResultList = () => {
  const uuid = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();
  const users = useSearchStore((s) => s.data);
  if (users.length === 0) return null;

  return (
    <Virtuoso
      data={users}
      style={{
        height: '100%',
        minHeight: 0,
      }}
      computeItemKey={(_, user) => user.user_id}
      itemContent={(_, user) => {
        const profile = user.profile as ProfileByUserIdData;

        return (
          <div
            style={{
              cursor: 'pointer',
              paddingBottom: '8px',
            }}
            onClick={async () => {
              await navigate({ hash: profile.user_id });
              layoutAction.doSetAside(true);
            }}
          >
            <HorizontalUserCard
              isSelected={uuid === profile.user_id}
              value={profile}
            >
              <HorizontalUserCard.Avatar />
              <HorizontalUserCard.Login />
            </HorizontalUserCard>
          </div>
        );
      }}
    />
  );
};
