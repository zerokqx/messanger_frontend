import { useChatHistory } from '@/entities/chat';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import { Box, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { MessageText } from '@/entities/chat/ui/message-text-type';
import { pagesMap } from '@/shared/lib/pages-map';
import type { ChatParticipantUi, UiMessage } from '@/entities/chat/ui/types';

const VIRTUOSO_START_INDEX = 100000;

interface ChatHistoryViewerProps {
  chatId: string;
  currentUser: ChatParticipantUi;
  interlocutor: ChatParticipantUi;
}

export const ChatHistoryViewer = ({
  chatId,
  currentUser,
  interlocutor,
}: ChatHistoryViewerProps) => {
  const [firstItemIndex, setFirstItemIndex] = useState(VIRTUOSO_START_INDEX);
  const isLoadingMoreRef = useRef(false);
  const isAtTopRef = useRef(false);
  const hasNextPageRef = useRef(false);

  const {
    data: historyChat,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatHistory(chatId);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    setFirstItemIndex(VIRTUOSO_START_INDEX);
    isLoadingMoreRef.current = false;
    isAtTopRef.current = false;
  }, [chatId]);

  const messages = useMemo<UiMessage[]>(() => {
    return pagesMap(historyChat).reverse();
  }, [historyChat]);

  const loadMore = useCallback(async () => {
    if (
      isLoadingMoreRef.current ||
      isFetchingNextPage ||
      !hasNextPageRef.current
    )
      return;
    isLoadingMoreRef.current = true;
    try {
      const result = await fetchNextPage();
      const newPage = result.data?.pages.at(-1);
      const addedCount = newPage?.data.items.length ?? 0;
      if (addedCount > 0) setFirstItemIndex((prev) => prev - addedCount);
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [fetchNextPage, isFetchingNextPage]);

  return (
    <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden', width: '100%' }}>
      {messages.length === 0 ? (
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
      ) : (
        <Virtuoso
          data={messages}
          firstItemIndex={firstItemIndex}
          style={{ height: '100%', width: '100%' }}
          initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
          followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
          computeItemKey={(_, item) =>
            item.client_id ?? String(item.message_id)
          }
          startReached={() => {
            isAtTopRef.current = true;
            void loadMore();
          }}
          itemContent={(_, item) =>
            item.message_type.includes('system') ? (
              <SystemMessage message={item} />
            ) : (
              <MessageText
                message={item}
                userIdOfCurrentUser={currentUser.userId ?? ''}
                avatarName={
                  item.sender_id === currentUser.userId
                    ? currentUser.avatarName
                    : interlocutor.avatarName
                }
                avatarSrc={
                  item.sender_id === currentUser.userId
                    ? currentUser.avatarSrc
                    : interlocutor.avatarSrc
                }
              />
            )
          }
        />
      )}
    </Box>
  );
};
