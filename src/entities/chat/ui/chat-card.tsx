import { Avatar, Badge, Box, Group, Paper, Stack, Text } from '@mantine/core';
import type { ChatCardProps } from './types';

const formatTime = (value?: string | null): string => {
  if (!value) return '--:--';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '--:--';

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getTitle = (title: string | undefined, chatType: string): string => {
  if (title && title.trim().length > 0) return title;
  return chatType === 'self' ? 'Saved Messages' : 'Private Chat';
};

const getMessagePreview = (message: string | null | undefined): string => {
  if (!message || message.trim().length === 0) return 'No messages yet';
  return message;
};

export const ChatCard = ({ chat, title, onClick }: ChatCardProps) => {
  const messagePreview = getMessagePreview(chat.last_message?.content);
  const chatTitle = getTitle(title, chat.chat_type);
  const timeLabel = formatTime(
    chat.last_message?.created_at ?? chat.created_at
  );

  return (
    <Paper
      component="button"
      type="button"
      onClick={onClick}
      w="100%"
      p="sm"
      radius="xl"
      withBorder
      style={{
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <Group align="flex-start" wrap="nowrap" gap="sm">
        <Avatar radius="1000px" variant="light">
          {chatTitle.slice(0, 1).toUpperCase()}
        </Avatar>

        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" wrap="nowrap" gap="xs">
            <Text fw={600} size="sm" truncate>
              {chatTitle}
            </Text>
            <Text size="xs" c="dimmed">
              {timeLabel}
            </Text>
          </Group>

          <Text size="xs" c="dimmed" lineClamp={1}>
            {messagePreview}
          </Text>
        </Stack>

        <Box>
          {chat.unread_count > 0 ? (
            <Badge radius="xl" size="sm" variant="filled">
              {chat.unread_count}
            </Badge>
          ) : null}
        </Box>
      </Group>
    </Paper>
  );
};
