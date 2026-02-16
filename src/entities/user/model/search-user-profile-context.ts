import { createContext, use } from 'react';
import type { ISearchProfileContext } from './types';

export const ProfileSearchContext = createContext<ISearchProfileContext | null>(
  null
);
export const useProfileContext = () => {
  const context = use(ProfileSearchContext);
  if (!context) throw new Error('Profile context is not defined');
  return context;
};
