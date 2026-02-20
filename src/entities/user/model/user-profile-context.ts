import type { components } from '@/shared/types/v1';
import { createStateContext } from 'react-use';

export type UserProfileContextState = Partial<
  components['schemas']['ProfileByUserIdData']
> | null;
export const [useUserProfileContext, UserProfileContext] =
  createStateContext<UserProfileContextState>(null);
