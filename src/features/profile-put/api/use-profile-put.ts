import { useEditProfileEditPut } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';

export const useProfilePut = () => {
  const mutate = useEditProfileEditPut();
  return mutate;
};
