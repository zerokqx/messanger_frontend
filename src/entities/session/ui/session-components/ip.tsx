import { Text } from '@mantine/core';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../Session.types';

export const Ip: SessionComponent['Ip'] = ({ textProps }) => {
  const session = useSessionContext();
  return (
    <Text  {...textProps}>
      Ip: {session.ip_address}
    </Text>
  );
};
