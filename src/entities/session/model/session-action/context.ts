import { createContext } from 'react';
import type { SessionActionContextType } from './context.types';

/**
 * @description Контекст для обьявление функций которые будут использовать сесии
 * */
export const SessionActionContext =
  createContext<SessionActionContextType | null>(null);
