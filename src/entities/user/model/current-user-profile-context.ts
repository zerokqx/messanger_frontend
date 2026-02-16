import { createContext, use } from 'react';
import type { ICurrentProfileContext } from './types';

export const ProfileContext = createContext<ICurrentProfileContext | null>(
  null
);
export const useProfileContext = () => {
  const context = use(ProfileContext);
  if (!context) throw new Error('Profile context is not defined');
  return context;
};
