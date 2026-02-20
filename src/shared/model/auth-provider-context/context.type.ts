import type { UseTokenStore } from '@/shared/token';
import type { TUserState } from '@/entities/user/model/types';
import type { StoreType } from '@colorfy-software/zfy';

export interface AuthContextTypes {
  isAuth: boolean;
  user: TUserState;
  token: StoreType<UseTokenStore>;
}

export type UseAuth = <T>(callback?: (ctx: AuthContextTypes) => T) => T;
