import type { UseTokenStore } from '@/entities/token';
import type { UserStore } from '@/entities/user/types/userStore.type';

export interface AuthContextTypes {
  isAuth: boolean;
  user: UserStore;
  token: UseTokenStore;
}

export type UseAuth = <T>(callback?: (ctx: AuthContextTypes) => T) => T;
