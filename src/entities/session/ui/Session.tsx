import type { SessionComponent } from './Session.types';
import { SessionContext } from '../model/session-context';
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
import { motion } from 'motion/react';

/**
 * @description Базовый компонент сессии. Связывает компоненты через контекст.
 * @remark Не предназначен для использования снаружи. Использовать только для постороения переиспользуемых instance сессий.
 * @see useSessionContext
 */
export const Session: SessionComponent = ({ session, children, gridProps }) => {
  return (
    <Grid
      renderRoot={(props) => (
        <motion.div
          {...props}
          initial={{ scale: 0.5, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
        />
      )}
      bdrs={'xl'}
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
Session.Trusted = Trusted;
Session.CreatedAt = CreatedAt;
Session.LastRefresh = LastRefresh;
Session.CurrentBadge = CurrentBadge;
Session.UserAgent = UserAgent;
Session.ThisDevice = ThisDevice;
