import { Text } from '@mantine/core';
import { useSessionContext } from '../../model/session-context-use';
import type { SessionComponent } from '../Session.types';

export const Ip: SessionComponent['Ip'] = ({ textProps }) => {
  const session = useSessionContext();
  return (
    <Text c={'dark'} {...textProps}>
      Ip: {session.ip_address}
    </Text>
  );
};
