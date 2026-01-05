import { Session } from './Session';
import { OnlyTrusted } from './session-components/only-trusted';
import type { SessionCardProps } from './Session.types';

export const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <Session session={session}>
      <Session.Header>
        <Session.UserAgent />
        <Session.Ip />
      </Session.Header>
      <Session.Body>
        <Session.CreatedAt />
        <Session.LastRefresh />
      </Session.Body>
    </Session>
  );
};
