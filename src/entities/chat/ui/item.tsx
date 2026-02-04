import { Avatar, Group, Stack, Text } from '@mantine/core';
import type { ChatConpouned } from '../types/chat-compouned';
import { hover } from '@/shared/styles/hover-opacity.css';

export const Item: ChatConpouned['Item'] = ({ userName, lastMessage }) => {
  return (
    <Group
      p={'xs'}
      className={hover}
      style={{
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      <Avatar key={userName} color="initials" name={userName} />
      <Stack gap={'xs'}>
        <Text truncate="end">{userName}</Text>

        <Text size="xs">{lastMessage}</Text>
      </Stack>
    </Group>
  );
};
