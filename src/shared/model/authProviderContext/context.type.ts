import type { useLogout } from '@/entities/user';
import type { UserStore } from '@/entities/user/types/userStore.type';
import type { useLogin } from '@/features/login';
import type { useRegister } from '@/features/register';

export interface AuthContextTypesAction {
  useRegister: typeof useRegister;
  useLogout: typeof useLogout;
  useLogin: typeof useLogin;
}

export type AuthContextTypes = AuthContextTypesAction & {
  isAuth: boolean;
  user: UserStore;
};

export type UseAuth = <T>(
  callback?: (ctx: AuthContextTypes) => T
) => T;
