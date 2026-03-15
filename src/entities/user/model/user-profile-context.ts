import type { components } from '@/shared/types/v1';
import { createContext, use } from 'react';

export type UserProfileContextState = Partial<
  components['schemas']['ProfileByUserIdData']
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
