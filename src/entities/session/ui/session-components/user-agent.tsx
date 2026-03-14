import { UAParser } from 'ua-parser-js';
import { useSessionContext } from '../../model/session.context';
import { Text } from '@mantine/core';
import type { SessionComponent } from '../session.types';
import { useMemo } from 'react';

export const UserAgent: SessionComponent['UserAgent'] = ({ textProps }) => {
  const session = useSessionContext();
  const ua = useMemo(() => {
    return new UAParser(session.user_agent ?? '').getResult();
  }, [session]);

  const browser = ua.browser.name ?? '';
  const browserVersion = ua.browser.major ?? '';
  const os = ua.os.name ?? '';

  return (
    <Text fw={500} size="md" lh={1.2} c="dimmed" {...textProps}>{`${os} ${browser}${
      browserVersion ? '-' : ''
    }${browserVersion}`}</Text>
  );
};
