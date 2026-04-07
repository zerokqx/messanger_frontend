import { ProfileForCurrentUser, useMe } from '@/entities/viewer';

interface ProfileTabContentProps {
  onEdit: () => void;
}

export const ProfileTabContent = ({ onEdit }: ProfileTabContentProps) => {
  const { data: profile } = useMe();

  return (
    <>
      <ProfileForCurrentUser withEdit onEdit={onEdit} profile={profile} />
    </>
  );
};
