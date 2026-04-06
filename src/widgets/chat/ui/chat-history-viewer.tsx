import {
  MessageLayout,
  MessageText,
  SystemMessage,
  type UiMessage,
  useMessageHistory,
} from '@/entities/message';
import {
  Avatar,
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
  } = useMessageHistory(chatId, 20);

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
        increaseViewportBy={800}
        style={{ height: '100%', width: '100%' }}
        followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
        defaultItemHeight={76}
        computeItemKey={(_, item) => String(item.message_id)}
        startReached={() => {
          handleStartReached();
        }}
        itemContent={(index, item) => {
          const localIndex = index - firstItemIndex;
          const isMe = item.sender_id === currentUserId;
          const avatarName = isMe ? currentUserLogin : targetUserName;
          const avatarSrc = isMe ? currentUserAvatar : targetUserAvatar;

          return (
            <Box
              pb={'xs'}
              pl={{ base: 'xs', sm: 'xl' }}
              pr={{ base: 'xs', sm: 'xl' }}
            >
              {item.message_type.includes('system') ? (
                <SystemMessage message={item} />
              ) : (
                <MessageLayout
                  isMe={isMe}
                  nextSameAuthor={
                    messages[localIndex + 1]?.sender_id === item.sender_id
                  }
                  chatId={chatId}
                  messageId={item.message_id}
                  variant={item.message_type[0]}
                  avatar={{
                    visible: true,
                    component: ({ className }) => (
                      <Avatar
                        className={className}
                        name={avatarName}
                        src={avatarSrc}
                      />
                    ),
                  }}
                >
                  <MessageText
                    message={item}
                    userIdOfCurrentUser={currentUserId}
                  />
                </MessageLayout>
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
