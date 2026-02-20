import type { ICurrentProfileContext } from './types';
import { createStateContext } from 'react-use';

export const [useProfileContext, ProfileContext] =
  createStateContext<ICurrentProfileContext | null>(null);
