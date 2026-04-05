import { useChatHistory } from '@/entities/chat';
import { MessageText } from '@/entities/chat/ui/message-text-type';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import type { UiMessage } from '@/entities/chat/ui/types';
import {
  Box,
  Center,
  Loader,
  Paper,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { MessageCircleMore } from 'lucide-react';
<<<<<<< Updated upstream
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
||||||| Stash base
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
=======
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogLevel, Virtuoso } from 'react-virtuoso';
>>>>>>> Stashed changes
import { useChatSession } from '../model/chat-session-context.ts';
import Logger from '@/shared/lib/logger/logger.ts';

const getMessageKey = (message: UiMessage, index: number) =>
  message.client_id ??
  message.message_id ??
  `${message.sender_id ?? 'unknown'}-${message.created_at ?? 'pending'}-${index}`;

const StackChat = Stack.withProps({
  gap: 'md',
  maw: '50rem',
  w: '100%',
  mx: 'auto',
  p: 'xs',
});

export const ChatHistoryViewer = () => {
  const chatId = useChatSession((state) => state.chatId);
  const currentUserId = useChatSession((state) => state.currentUser.user_id);
  const currentUserLogin = useChatSession((state) => state.currentUser.login);
  const currentUserAvatar = useChatSession(
    (state) => state.currentUser.avatars.current.url
  );
  const targetUserName = useChatSession(
    (state) => state.targetUser.formatLogin.name
  );
  const targetUserAvatar = useChatSession(
    (state) => state.targetUser.avatars.current.url
  );

  const {
    data: historyChat,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatHistory(chatId, 20);

  const messages = historyChat ?? [];

  if (isLoading && messages.length === 0) {
    return (
      <Center style={{ flex: 1, minHeight: 0, width: '100%' }}>
        <Loader />
      </Center>
    );
  }

  if (!isLoading && messages.length === 0) {
    return (
      <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden', width: '100%' }}>
        <Box
          p="md"
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            withBorder
            radius="xl"
            p="xl"
            maw={360}
            w="100%"
            style={{ textAlign: 'center' }}
          >
            <Stack align="center" gap="sm">
              <ThemeIcon size={52} radius="xl" variant="light">
                <MessageCircleMore size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                Чат пока пуст
              </Text>
              <Text c="dimmed" size="sm">
                Отправьте первое сообщение, чтобы начать разговор.
              </Text>
            </Stack>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Virtuoso
        key={chatId}
        components={{
          List: StackChat,
        }}
        data={messages}
        increaseViewportBy={1000}
        initialTopMostItemIndex={messages.length - 1}
        alignToBottom
        atTopStateChange={async (atBottom) => {
          if (!isFetchingNextPage && hasNextPage && atBottom) {
            Logger.debug('chat-history-viewer.tsx', 'Load new page', [
              {
                isFetchingNextPage,
                hasNextPage,
              },
            ]);
            await fetchNextPage();
          }
        }}
<<<<<<< Updated upstream
        itemContent={(_, item) =>
          item.message_type.includes('system') ? (
            <SystemMessage message={item} />
          ) : (
            <MessageText
              message={item}
              userIdOfCurrentUser={currentUserId}
              avatarName={
                item.sender_id === currentUserId
                  ? currentUserLogin
                  : targetUserName
              }
              avatarSrc={
                item.sender_id === currentUserId
                  ? currentUserAvatar
                  : targetUserAvatar
              }
            />
          )
        }
||||||| Stash base
        itemContent={(index, item) => {
          const localIndex = index - firstItemIndex;
          return (
            <Box
              pb={'xs'}
              pl={{ base: 'xs', sm: 'xl' }}
              pr={{ base: 'xs', sm: 'xl' }}
            >
              {item.message_type.includes('system') ? (
                <SystemMessage message={item} />
              ) : (
                <MessageText
                  message={item}
                  nextUserIdOfMessage={messages[localIndex + 1]?.sender_id}
                  previousUserIdOfMessage={messages[localIndex - 1]?.sender_id}
                  userIdOfCurrentUser={currentUserId}
                  avatarName={
                    item.sender_id === currentUserId
                      ? currentUserLogin
                      : targetUserName
                  }
                  avatarSrc={
                    item.sender_id === currentUserId
                      ? currentUserAvatar
                      : targetUserAvatar
                  }
                />
              )}
            </Box>
          );
        }}
=======
        startReached={async () => {
          if (!isFetchingNextPage && hasNextPage) {
            Logger.debug('chat-history-viewer.tsx', 'Load new page', [
              {
                isFetchingNextPage,
                hasNextPage,
              },
            ]);
            await fetchNextPage();
          }
        }}
        logLevel={LogLevel.DEBUG}
        style={{ height: '100%', width: '100%' }}
        followOutput={(isAtBottom) => (isAtBottom ? 'auto' : false)}
        defaultItemHeight={76}
        computeItemKey={(index, item) => getMessageKey(item, index)}
        itemContent={(index, item) => {
          return (
            <Box
              pb="xs"
              pl={{ base: 'xs', sm: 'xl' }}
              pr={{ base: 'xs', sm: 'xl' }}
            >
              {item.message_type.includes('system') ? (
                <SystemMessage message={item} />
              ) : (
                <MessageText
                  message={item}
                  nextUserIdOfMessage={messages[index + 1]?.sender_id}
                  previousUserIdOfMessage={messages[index - 1]?.sender_id}
                  userIdOfCurrentUser={currentUserId}
                  avatarName={
                    item.sender_id === currentUserId
                      ? currentUserLogin
                      : targetUserName
                  }
                  avatarSrc={
                    item.sender_id === currentUserId
                      ? currentUserAvatar
                      : targetUserAvatar
                  }
                />
              )}
            </Box>
          );
        }}
>>>>>>> Stashed changes
      />
    </Box>
  );
};
