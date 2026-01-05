import { useSessionContext } from '../../model/session-context-use';
import { trustedSession } from '../../model/session-state';
import type { SessionComponent } from '../Session.types';

export const OnlyTrusted: SessionComponent['OnlyTrusted'] = ({ children }) => {
  const session = useSessionContext();
  const isTrusted = trustedSession(session.created_at);
  return isTrusted && children;
};
