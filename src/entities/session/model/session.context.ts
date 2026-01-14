import { use } from 'react';

import { createContext } from 'react';
import type { SessionData } from '../ui';

export const SessionContext = createContext<SessionData | null>(null);
export const useSessionContext = () => {
  const context = use(SessionContext);
  if (!context) throw new Error('Session provider is not defined');
  return context;
};
