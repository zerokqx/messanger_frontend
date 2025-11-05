import { createContext } from 'react';
import type { Inject } from '../../types';

export const InjectContext = createContext<Inject<object> | null>(null);
