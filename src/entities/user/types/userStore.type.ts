import type { ClearState } from '@/shared/types';
import type { components } from '@/shared/types/v1';

export type TUserState = components['schemas']['ProfileResponse']['data'];

export interface TUserActions extends ClearState {
  setUser: (user: TUserState) => void;
  setBio: (bio: string) => void;
  editPermission: (
    permisions: Partial<TUserState['profile_permissions']>
  ) => void;
}
export type UserStore = TUserState & TUserActions;
