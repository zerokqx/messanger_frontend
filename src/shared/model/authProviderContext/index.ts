import { createContext, use } from 'react';
import type { AuthContextTypes } from './context.type';

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined
);

type Callback<T> = (ctx: NonNullable<AuthContextTypes>) => T
export function useAuth<T>(callback?:Callback<T>):T
export function useAuth<T>(callback?:Callback<T> ) {
  const context = use(AuthContext);
  if (!context) throw new Error("You haven't connected an Auth provider.");

  return callback ? callback(context) : context;
}
const d = useAuth()
