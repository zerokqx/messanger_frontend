import type { SessionComponent } from './session.types';
import { Header } from './session-components/header';
import { Ip } from './session-components/ip';
import { Trusted } from './session-components/trusted';
import { CreatedAt } from './session-components/created-at';
import { LastRefresh } from './session-components/last-refresh';
import { Grid } from '@mantine/core';
import { Body } from './session-components/body';
import { Footer } from './session-components/footer';
import { CurrentBadge } from './session-components/current-session-badge';
import { UserAgent } from './session-components/user-agent';
import { ThisDevice } from './session-components/this-device';
import { SessionContext } from '../model/session.context';
import { lightDark } from '@/shared/lib/light-dark';

/**
 * @description Базовый компонент сессии. Связывает компоненты через контекст.
 * @remark Не предназначен для использования снаружи. Использовать только для постороения переиспользуемых instance сессий.
 * @see useSessionContext
 */
export const Session: SessionComponent = ({ session, children, gridProps }) => {
  return (
    <Grid
      bdrs="xl"
      bg={lightDark('gray.0', 'dark.8')}
      p="md"
      style={{
        border: `1px solid ${lightDark('gray.3', 'dark.4')}`,
      }}
      {...gridProps}
    >
      <SessionContext value={session}>{children}</SessionContext>
    </Grid>
  );
};

Session.Header = Header;
Session.Body = Body;
Session.Footer = Footer;
Session.Ip = Ip;
Session.Trusted = Trusted;
Session.CreatedAt = CreatedAt;
Session.LastRefresh = LastRefresh;
Session.CurrentBadge = CurrentBadge;
Session.UserAgent = UserAgent;
Session.ThisDevice = ThisDevice;
