import { Group, Paper, Text } from '@mantine/core';
import type { SystemMessageProps } from './types';

const getSystemText = (content: SystemMessageProps['message']['content']) => {
  if (typeof content === 'string' && content.trim().length > 0) return content;
  return 'System message';
};

export const SystemMessage = ({ message }: SystemMessageProps) => {
  return (
    <Group justify="center" w="100%">
      <Paper px="sm" py={6} radius="xl" bg="gray.1">
        <Text c="dimmed" size="xs">
          {getSystemText(message.content)}
        </Text>
      </Paper>
    </Group>
  );
};
