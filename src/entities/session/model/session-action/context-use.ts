import { use } from 'react';
import { SessionActionContext } from './context';
import Logger from '@/shared/lib/logger/logger';

export const useSesionActionsContext = () => {
  const context = use(SessionActionContext);
  if (!context)
    throw new Error(
      Logger.createErrorMessage(
        'useSessionActionsContext',
        'Context is not defined'
      )
    );
  return context;
};
