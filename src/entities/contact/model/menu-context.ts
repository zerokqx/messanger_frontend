import Logger from '@/shared/lib/logger/logger';
import { createContext, use } from 'react';

export type MenuContextType = string;
export const MenuContext = createContext<MenuContextType | null>(null);
export const useMenuContext = () => {
  const context = use(MenuContext);
  if (!context)
    throw new Error(
      Logger.createErrorMessage('useMenuContext', 'Contexts is not defined')
    );
  return context;
};
