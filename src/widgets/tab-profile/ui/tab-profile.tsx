import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser, SkeletonProfile } from '@/entities/user';
import { useLogger } from '@mantine/hooks';

export const ProfileTab = () => {
  const { data: user, isLoading } = useMe();
  useLogger('ProfileTab', [user, isLoading]);

  if (isLoading || !user) {
    return <SkeletonProfile />;
  }
  return <>{user && <ProfileForCurrentUser profile={user} />}</>;
};
