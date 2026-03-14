import { Text } from '@mantine/core';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../session.types';

export const Ip: SessionComponent['Ip'] = ({ textProps }) => {
  const session = useSessionContext();

  return (
    <Text c="dimmed" ff="monospace" size="sm" {...textProps}>
      IP: {session.ip_address}
    </Text>
  );
};
