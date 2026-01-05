import { use } from 'react';
import { SessionContext } from './session-context';

export const useSessionContext = () => {
  const context = use(SessionContext);
  if (!context) throw new Error('Session provider is not defined');
  return context;
};
