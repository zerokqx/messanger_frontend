import { createStateContext } from 'react-use';
import type { TabsDeclarationKeys } from './tabs-types';

export const [useSharedQueryName, SharedQueryNameProvider] =
  createStateContext<string>('');
