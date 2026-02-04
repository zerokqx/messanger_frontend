import { UAParser } from 'ua-parser-js';
import { useSessionContext } from '../../model/session.context';
import { Text } from '@mantine/core';
import type { SessionComponent } from '../session.types';
import { useMemo } from 'react';

export const UserAgent: SessionComponent['UserAgent'] = () => {
  const session = useSessionContext();
  const ua = useMemo(() => {
    return new UAParser(session.user_agent ?? '').getResult();
  }, [session]);
  const browser = ua.browser.name ?? '';
  const browserVersion = ua.browser.major ?? '';
  const device = ua.device.type ?? '';
  const os = ua.os.name ?? '';

  return (
    <Text
      c={'blue'}
    >{`${device} ${os} ${browser}${browserVersion && '-'}${browserVersion}`}</Text>
  );
};
