import { ProfileForCurrentUser } from '@/entities/user';
import { useMe } from '@/entities/user/model/me.query';

interface ProfileTabContentProps {
  onEdit: () => void;
}

export const ProfileTabContent = ({ onEdit }: ProfileTabContentProps) => {
  const { data: profile } = useMe();

  return <ProfileForCurrentUser withEdit onEdit={onEdit} profile={profile} />;
};
