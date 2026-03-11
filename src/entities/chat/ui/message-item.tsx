import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { Check, CheckCheck } from 'lucide-react';
import { useSettingsStore } from '@/shared/lib/settings';
import type { MessageProps } from './types';

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

const getMessageText = (content: MessageProps['message']['content']): string => {
  if (typeof content === 'string' && content.trim().length > 0) return content;
  return 'Unsupported message';
};

export const MessageItem = ({
  message,
  isOwn = false,
  senderName,
  avatarLabel,
  withAvatar = true,
  withSenderName = true,
  rightSection,
}: MessageProps) => {
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const text = getMessageText(message.content);
  const time = timeFormatter.format(new Date(message.created_at));

  const statusIcon = isOwn ? (
    message.is_viewed ? (
      <CheckCheck size={12} />
    ) : (
      <Check size={12} />
    )
  ) : null;

  return (
    <Group
      justify={isOwn ? 'flex-end' : 'flex-start'}
      align="flex-end"
      wrap="nowrap"
      w="100%"
      gap="xs"
    >
      {!isOwn && withAvatar && (
        <Avatar radius="xl" size="sm" name={avatarLabel ?? senderName ?? 'U'} />
      )}

      <Stack gap={4} maw="75%" align={isOwn ? 'flex-end' : 'flex-start'}>
        {!isOwn && withSenderName && senderName && (
          <Text  size="xs" c={`${primaryColor}.6`} fw={600}>
            {senderName}
          </Text>
        )}

        <Paper
          px="sm"
          py={8}
          radius="md"
          bg={isOwn ? `${primaryColor}.9` : 'dark.6'}
          c={isOwn ? 'white' : undefined}
          style={{
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Text size="sm">{text}</Text>
        </Paper>

        <Group gap={6} align="center" justify={isOwn ? 'flex-end' : 'flex-start'}>
          <Text size="xs" c="dimmed">
            {time}
          </Text>
          {statusIcon}
          {rightSection}
        </Group>
      </Stack>
    </Group>
  );
};
