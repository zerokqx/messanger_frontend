import { createContext } from 'react';
import type { SessionData } from '../ui';

export const SessionContext = createContext<SessionData | null>(null);
