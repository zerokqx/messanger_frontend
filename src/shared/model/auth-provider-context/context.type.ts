import type { UseTokenStore } from '@/shared/token';
import type { UserStore } from '@/entities/user/types/user-store.type';
import type { StoreType } from '@colorfy-software/zfy';

export interface AuthContextTypes {
  isAuth: boolean;
  user: UserStore;
  token: StoreType<UseTokenStore>;
}

export type UseAuth = <T>(callback?: (ctx: AuthContextTypes) => T) => T;
