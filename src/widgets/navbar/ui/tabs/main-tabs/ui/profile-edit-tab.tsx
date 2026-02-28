import { ProfileEditForm } from '@/features/edit-profile';

interface ProfileEditTabContentProps {
  onSuccess: () => void;
}

export const ProfileEditTabContent = ({
  onSuccess,
}: ProfileEditTabContentProps) => {
  return <ProfileEditForm onSuccess={onSuccess} />;
};
