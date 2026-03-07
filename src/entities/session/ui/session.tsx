import type { SessionComponent } from './session.types';
import { Header } from './session-components/header';
import { Ip } from './session-components/ip';
import { Trusted } from './session-components/trusted';
import { CreatedAt } from './session-components/created-at';
import { LastRefresh } from './session-components/last-refresh';
import { Grid, useMantineColorScheme } from '@mantine/core';
import { Body } from './session-components/body';
import { Footer } from './session-components/footer';
import { CurrentBadge } from './session-components/current-session-badge';
import { UserAgent } from './session-components/user-agent';
import { ThisDevice } from './session-components/this-device';
import { SessionContext } from '../model/session.context';
import * as m from 'motion/react-m';

/**
 * @description Базовый компонент сессии. Связывает компоненты через контекст.
 * @remark Не предназначен для использования снаружи. Использовать только для постороения переиспользуемых instance сессий.
 * @see useSessionContext
 */
export const Session: SessionComponent = ({ session, children, gridProps }) => {
  const {colorScheme} = useMantineColorScheme()
  return (

    <Grid
      renderRoot={(props) => (
        <m.div
          {...props}
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
        />
      )}
      bdrs={'xl'}
      bg={colorScheme ==='dark' ? 'dark':'gray.1'}
      p={'xs'}
      bd={'1px solid gray'}
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
