import { RoundedContainerGroup } from '@/shared/ui/boxes';
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
import type {
  PrivateChatListItem,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useSettingsStore } from '@/shared/lib/settings';
import useRipple from 'useripple';
import { prefetchGetUserProfileByUserIdUserIdGetQuery } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';

export interface ChatCardProps {
  isActive?: boolean;
  unreadCount: PrivateChatListItem['unread_count'];
  ids: {
    chatId: PrivateChatListItem['chat_id'];
    userId: string;
  };
  preview?: {
    content?: string;
    createdAt?: string;
  };
  avatarSrc?: string;
  displayName: string;
  onClick?: () => void;
}

const formatTime = (value?: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const ChatCard = ({
  ids,
  unreadCount,
  avatarSrc,
  preview,
  onClick,
  isActive,
  displayName,
}: ChatCardProps) => {
  const primary = useSettingsStore((s) => s.data.primaryColor);
  const [addRipples, ripples] = useRipple();
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
        await throttledPrefetch(ids.userId);
      }}
      onMouseLeave={() => {
        throttledPrefetch.cancel();
      }}
      onMouseEnter={async () => {
        await throttledPrefetch(ids.userId);
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
        src={avatarSrc}
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
          {preview?.createdAt ? (
            <Text
              c={isActive ? contrastColor : undefined}
              size="xs"
              style={{ flexShrink: 0 }}
            >
              {formatTime(preview.createdAt)}
            </Text>
          ) : null}
        </Group>

        <Text
          opacity={0.7}
          c={isActive ? contrastColor : undefined}
          size="sm"
          lineClamp={1}
        >
          {preview?.content}
        </Text>
      </Stack>

      <Box style={{ flexShrink: 0 }}>
        {unreadCount > 0 ? (
          <Badge radius="xl" variant="filled">
            {unreadCount}
          </Badge>
        ) : null}
      </Box>
    </RoundedContainerGroup>
  );
};
