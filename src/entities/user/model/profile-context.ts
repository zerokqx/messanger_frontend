import { createContext, use } from 'react';
import type { IProfileContext } from './types/profile-context.types';

export const ProfileContext = createContext<IProfileContext | null>(null);
export const useProfileContext = () => {
  const context = use(ProfileContext);
  if (!context) throw new Error('Profile context is not defined');
  return context;
};
