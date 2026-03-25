import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useSearchStore } from '../model';
import { HorizontalUserCard, useDownloadAvatar } from '@/entities/user';
import { MotionStagerList, StagerItem } from '@/shared/ui/motion-stager-list';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';

export const SearchResultList = () => {
  const uuid = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();
  const users = useSearchStore((s) => s.data);
  const animationKey = users.map((u) => u.user_id).join(':');
  if (users.length === 0) return;

  return (
    <MotionStagerList key={animationKey} gap={'xs'}>
      {users.map((user) => {
        const profile = user.profile as ProfileByUserIdData;
        return (
          <StagerItem
            key={user.user_id}
            style={{ cursor: 'pointer' }}
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
          </StagerItem>
        );
      })}
    </MotionStagerList>
  );
};
