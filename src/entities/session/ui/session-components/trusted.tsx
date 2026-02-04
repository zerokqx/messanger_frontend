import { useSessionContext } from '../../model/session.context';
import { trustedSession } from '../../model/session-state';
import type { SessionComponent } from '../session.types';

export const Trusted: SessionComponent['Trusted'] = ({ children, trusted }) => {
  const session = useSessionContext();
  const isTrusted = trustedSession(session.created_at);
  return trusted === isTrusted && children;
};
