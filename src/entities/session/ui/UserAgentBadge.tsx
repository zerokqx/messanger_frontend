import { useMemo } from 'react';
import type { UAComponentProps } from './UserAgentBadge.types';
import { UAParser } from 'ua-parser-js';
import { Group, ThemeIcon } from '@mantine/core';
import { browserToColor, deviceToIcon } from '../config/session.config';

export const UserAgentBadge = ({ ua }: UAComponentProps) => {
  const parsedUa = useMemo(() => {
    if (!ua) return;

    const userAgent = new UAParser(ua);
    console.log(userAgent);
    return userAgent.getResult();
  }, [ua]);
  console.log(parsedUa);

  if (!parsedUa) return;
  const browser = browserToColor[parsedUa.browser.name ?? 'unknow'];
  const device = deviceToIcon[parsedUa.device.type ?? 'unknow'];

  return (
    <Group>
      {browser && (
        <ThemeIcon
          variant="filled"
          bdrs={'xl'}
          title={`Браузер: ${parsedUa.browser.name ?? ''}`}
          color={browser.color}
        >
          <browser.icon />
        </ThemeIcon>
      )}
      <ThemeIcon
        title="Устройство входа"
        variant="filled"
        bdrs={'xl'}
        color={device.color}
      >
        <device.icon />
      </ThemeIcon>
    </Group>
  );
};
