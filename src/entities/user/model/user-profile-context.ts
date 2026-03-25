import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { createContext, use } from 'react';

export type UserProfileContextState = Partial<
ProfileByUserIdData
> | null;

const UserProfileContext = createContext<UserProfileContextState | undefined>(
  undefined
);

export { UserProfileContext };

export const useUserProfileContext = (): UserProfileContextState => {
  const profile = use(UserProfileContext);

  if (profile === undefined) {
    throw new Error(
      'HorizontalUserCard compound parts must be used inside <HorizontalUserCard />.'
    );
  }

  return profile;
};
