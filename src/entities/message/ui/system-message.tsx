import { Group, Paper, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import type { SystemMessageProps } from './types';

const getSystemText = (
  content: SystemMessageProps['message']['content'],
  fallback: string
) => {
  if (typeof content === 'string' && content.trim().length > 0) {
    return content;
  }

  return fallback;
};

/** Компактная строка для системных сообщений из истории чата. */
export const SystemMessage = ({ message }: SystemMessageProps) => {
  const [t] = useTranslation('chat');

  return (
    <Group justify="center" w="100%">
      <Paper px="sm" py={6} radius="xl" bg="gray.1">
        <Text c="dimmed" size="xs">
          {getSystemText(message.content, t('system-message'))}
        </Text>
      </Paper>
    </Group>
  );
};
