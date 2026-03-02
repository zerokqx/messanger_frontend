import type { components } from '@/shared/types/v1';
import type { Dispatch, SetStateAction } from 'react';
import { createStateContext } from 'react-use';

export type UserProfileContextState = Partial<
  components['schemas']['ProfileByUserIdData']
> | null;

const [useUserProfileContextRaw, UserProfileContext] = createStateContext<
  UserProfileContextState | undefined
>(undefined);

export { UserProfileContext };

export const useUserProfileContext = (): [
  UserProfileContextState,
  Dispatch<SetStateAction<UserProfileContextState | undefined>>,
] => {
  const [profile, setProfile] = useUserProfileContextRaw();

  if (profile === undefined) {
    throw new Error(
      'HorizontalUserCard compound parts must be used inside <HorizontalUserCard />.'
    );
  }

  return [profile, setProfile];
};
