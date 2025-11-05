import { use } from 'react';
import { SelecteContext } from '../model/context';

export const useSelected = () => {
  const context = use(SelecteContext);
  if (!context)
    throw new Error(
      'Provider hook is not in context. Put this hook in context!'
    );
  return context;
};
