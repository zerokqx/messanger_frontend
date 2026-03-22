import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { Check, CheckCheck } from 'lucide-react';
import { useSettingsStore } from '@/shared/lib/settings';
import type { ChatMessage, MessageProps } from './types';
import { lightDark } from '@/shared/lib/light-dark';
import { formatLogin } from '@/shared/lib/formaters';

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

const getMessageText = (content: ChatMessage['content']): string => {
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
      align='start'
      wrap="nowrap"
      w="100%"
      gap="xs"
    >
      {!isOwn && withAvatar && (
        <Avatar
          radius="xl"
          size="sm"
          // name={
          //   avatarLabel ??
          //   senderName ??
          //   formatLogin(message.sender_data.login).name
          // }
        />
      )}

      <Stack gap={4} maw="75%" align={isOwn ? 'flex-end' : 'flex-start'}>
        {!isOwn && withSenderName && senderName && (
          <Text size="xs" c={`${primaryColor}.6`} fw={600}>
            {senderName}
          </Text>
        )}

        <Paper
          px="sm"
          py={8}
          radius="md"
          bg={isOwn ? `${primaryColor}.9` : lightDark('gray.2', 'dark.8')}
          style={{
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Text size="sm">{text}</Text>
        </Paper>

        <Group
          gap={6}
          align="center"
          justify={isOwn ? 'flex-end' : 'flex-start'}
        >
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
