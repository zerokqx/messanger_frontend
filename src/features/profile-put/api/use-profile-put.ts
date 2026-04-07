import { useEditProfileEditPut } from '@/shared/api/orval/profile-service-v2/v2-profile/v2-profile';

export const useProfilePut = () => {
  const mutate = useEditProfileEditPut();
  return mutate;
};
