import type { SessionData } from './session.types';

export interface SessionCurrentProps {
  session: SessionData;
  singleSession?:boolean
}
export interface SessionNotCurrentProps {
  session: SessionData;
}
