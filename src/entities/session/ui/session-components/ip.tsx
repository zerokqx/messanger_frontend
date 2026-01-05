import { Text } from '@mantine/core';
import { useSessionContext } from '../../model/session-context-use';

export const Ip = ({ ...props }) => {
  const session = useSessionContext();
  return (
    <Text c={'dark'} {...props}>
      {session.ip_address}
    </Text>
  );
};
