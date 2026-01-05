import type { SessionComponent } from './Session.types';
import { SessionContext } from '../model/session-context';
import { Header } from './session-components/header';
import { Ip } from './session-components/ip';
import { OnlyTrusted } from './session-components/only-trusted';
import { CreatedAt } from './session-components/created-at';
import { LastRefresh } from './session-components/last-refresh';
import { Grid } from '@mantine/core';
import { Body } from './session-components/body';
import { Footer } from './session-components/footer';
import { CurrentBadge } from './session-components/current-session-badge';
import { UserAgent } from './session-components/user-agent';
export const Session: SessionComponent = ({ session, children, gridProps }) => {
  return (
    <Grid
      bdrs={'md'}
      bg={'black'}
      p={'xs'}
      bd={'1px solid dark.9'}
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
Session.OnlyTrusted = OnlyTrusted;
Session.CreatedAt = CreatedAt;
Session.LastRefresh = LastRefresh;
Session.CurrentBadge = CurrentBadge;
Session.UserAgent = UserAgent;
