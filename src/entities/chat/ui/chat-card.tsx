import { urlAvatar } from '@/entities/user';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import type { components } from '@/shared/types/v1';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { lightDark } from '@/shared/lib/light-dark';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';
import { Avatar, Badge, Box, Group, Stack, Text } from '@mantine/core';
import { getGetPrivateChatHistoryHistoryGetInfiniteQueryKey } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';

export type ChatListItem = components['schemas']['PrivateChatListItem'];

export interface ChatCardProps {
  chat: ChatListItem;
  isActive?: boolean;
  title?: string;
  onClick?: () => void;
}

const formatTime = (value?: string | null): string => {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getMessagePreview = (content: unknown): string => {
  if (typeof content !== 'string' || content.trim().length === 0) {
    return 'Нет сообщений';
  }

  return content;
};

export const ChatCard = ({ chat, onClick, isActive, title }: ChatCardProps) => {
  const profile = chat.chat_data as unknown as ProfileByUserIdData;
  const displayName =
    title ?? formatLogin(profile.login, profile.custom_name ?? undefined).name;
  const preview = getMessagePreview(chat.last_message?.content);
  const time = formatTime(chat.last_message?.created_at ?? chat.created_at);

  return (
    <RoundedContainerGroup
      onClick={onClick}
      wrap="nowrap"
      justify="space-between"
      gap="sm"
      bg={
        isActive ? lightDark('gray.1', 'dark.7') : lightDark('gray.0', 'dark.8')
      }
      style={{
        cursor: 'pointer',
        transition:
          'background-color 160ms ease, border-color 160ms ease, transform 160ms ease',
        alignItems: 'center',
      }}
    >
      <Avatar
        size={48}
        radius="xl"
        src={urlAvatar(profile.user_id, profile.avatars?.current?.file_id)}
        name={displayName}
      />

      <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
        <Group justify="space-between" wrap="nowrap" gap="xs">
          <Text fw={600} size="sm" truncate>
            {displayName}
          </Text>
          {time ? (
            <Text c="dimmed" size="xs" style={{ flexShrink: 0 }}>
              {time}
            </Text>
          ) : null}
        </Group>

        <Text c="dimmed" size="sm" lineClamp={1}>
          {preview}
        </Text>
      </Stack>

      <Box style={{ flexShrink: 0 }}>
        {chat.unread_count > 0 ? (
          <Badge radius="xl" variant="filled">
            {chat.unread_count}
          </Badge>
        ) : null}
      </Box>
    </RoundedContainerGroup>
  );
};
