import { urlAvatar } from '@/entities/user';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';
import {
  Avatar,
  Badge,
  Box,
  getContrastColor,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import type { PrivateChatListItem } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useSettingsStore } from '@/shared/lib/settings';
import useRipple from 'useripple';
import { prefetchGetUserProfileByUserIdUserIdGetQuery } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { useQueryClient } from '@tanstack/react-query';
import { debounce, throttle } from 'lodash';
import { useMemo } from 'react';

export interface ChatCardProps {
  chat: PrivateChatListItem;
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
  const primary = useSettingsStore((s) => s.data.primaryColor);
  const [addRipples, ripples] = useRipple();
  const displayName =
    title ?? formatLogin(profile.login, profile.custom_name ?? undefined).name;
  const preview = getMessagePreview(chat.last_message?.content);
  const time = formatTime(chat.last_message?.created_at ?? chat.created_at);
  const theme = useMantineTheme();
  const contrastColor = getContrastColor({ color: primary, theme });
  const queryClient = useQueryClient();
  const throttledPrefetch = useMemo(
    () =>
      debounce(async (userId: string) => {
        try {
          await prefetchGetUserProfileByUserIdUserIdGetQuery(
            queryClient,
            userId
          );
        } catch (e) {
          console.error('Prefetch failed', e);
        }
      }, 200),
    [queryClient]
  );
  return (
    <RoundedContainerGroup
      onClick={(e) => {
        onClick?.();
        addRipples(e);
      }}
      onTouchStart={async () => {
        await throttledPrefetch(profile.user_id);
      }}
      onMouseLeave={() => {
        throttledPrefetch.cancel();
      }}
      onMouseEnter={async () => {
        await throttledPrefetch(profile.user_id);
      }}
      wrap="nowrap"
      justify="space-between"
      gap="sm"
      bd={'none'}
      bg={isActive ? primary : undefined}
      align="center"
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {ripples}
      <Avatar
        size={48}
        color={isActive ? contrastColor : undefined}
        radius="xl"
        src={urlAvatar(profile.user_id, profile.avatars?.current?.file_id)}
        name={displayName}
      />

      <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
        <Group justify="space-between" wrap="nowrap" gap="xs">
          <Text
            c={isActive ? contrastColor : undefined}
            fw={600}
            size="sm"
            truncate
          >
            {displayName}
          </Text>
          {time ? (
            <Text
              c={isActive ? contrastColor : undefined}
              size="xs"
              style={{ flexShrink: 0 }}
            >
              {time}
            </Text>
          ) : null}
        </Group>

        <Text
          opacity={0.7}
          c={isActive ? contrastColor : undefined}
          size="sm"
          lineClamp={1}
        >
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
