import type { Fn } from '@/shared/types/utils/functions';
import type { SessionData } from './Session.types';

export interface SessionCurrentProps {
  onRevokeAll: Fn<[], void>;
  session: SessionData;
}
export interface SessionNotCurrentProps {
  onRevoke: Fn<[id: string], void>;
  session: SessionData;
}
