import { useChatHistory } from '@/entities/chat';
import { MessageText } from '@/entities/chat/ui/message-text-type';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import type { UiMessage } from '@/entities/chat/ui/types';
import {
  Box,
  Center,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { MessageCircleMore } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useChatSession } from '../model/chat-session-context.ts';

const INITIAL_FIRST_ITEM_INDEX = 100000;

export const ChatHistoryViewer = () => {
  const { t } = useTranslation('chat');
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

  const [firstItemIndex, setFirstItemIndex] = useState(
    INITIAL_FIRST_ITEM_INDEX
  );
  const isPrependingRef = useRef(false);
  const previousLengthRef = useRef(0);

  const {
    data: historyChat,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChatHistory(chatId, 20);

  const messages = useMemo<UiMessage[]>(() => {
    return historyChat ? [...historyChat].reverse() : [];
  }, [historyChat]);

  useEffect(() => {
    const previousLength = previousLengthRef.current;
    const currentLength = messages.length;

    if (isPrependingRef.current && currentLength > previousLength) {
      setFirstItemIndex(
        (current) => current - (currentLength - previousLength)
      );
      isPrependingRef.current = false;
    }

    previousLengthRef.current = currentLength;
  }, [chatId, messages.length]);

  useLayoutEffect(() => {
    const previousLength = previousLengthRef.current;
    const currentLength = messages.length;

    if (isPrependingRef.current && currentLength > previousLength) {
      setFirstItemIndex(
        (current) => current - (currentLength - previousLength)
      );
      isPrependingRef.current = false;
    }

    previousLengthRef.current = currentLength;
  }, [messages.length]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      isPrependingRef.current = false;
    }
  }, [isFetchingNextPage]);

  const handleStartReached = () => {
    if (!hasNextPage || isFetchingNextPage || isPrependingRef.current) {
      return;
    }

    isPrependingRef.current = true;
    void fetchNextPage().catch(() => {
      isPrependingRef.current = false;
    });
  };

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
                {t('empty-title')}
              </Text>
              <Text c="dimmed" size="sm">
                {t('empty-description')}
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
        data={messages}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={messages.length - 1}
        alignToBottom
        overscan={20}
        increaseViewportBy={500}
        style={{ height: '100%', width: '100%' }}
        followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
        defaultItemHeight={76}
        computeItemKey={(_, item) => item.client_id ?? String(item.message_id)}
        startReached={() => {
          handleStartReached();
        }}
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
                    nextUserIdOfMessage={messages[localIndex+1]?.sender_id}
                    previousUserIdOfMessage={messages[localIndex-1]?.sender_id}
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
      />
      {isFetchingNextPage && (
        <Center
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <Loader size="sm" />
        </Center>
      )}
    </Box>
  );
};
