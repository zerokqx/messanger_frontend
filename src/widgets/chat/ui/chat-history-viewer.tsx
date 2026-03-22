import { useChatHistory } from '@/entities/chat';
import { MessageItem } from '@/entities/chat/ui/message-item';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import { Box } from '@mantine/core';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

const VIRTUOSO_START_INDEX = 100000;
interface ChatHistoryViewerProps {
  chatId: string;
}

export const ChatHistoryViewer = ({ chatId }: ChatHistoryViewerProps) => {
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

  const messages = useMemo(() => {
    if (!historyChat?.pages) return [];
    return historyChat.pages.flatMap((page) => page.data.items).reverse();
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
    <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <Virtuoso
        data={messages}
        firstItemIndex={firstItemIndex}
        style={{ height: '100%' }}
        initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
        followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
        computeItemKey={(_, item) => String(item.message_id)}
        startReached={() => {
          isAtTopRef.current = true;
          void loadMore();
        }}
        itemContent={(_, item) =>
          item.message_type.includes('system') ? (
            <SystemMessage message={item} />
          ) : (
            <MessageItem message={item} />
          )
        }
      />
    </Box>
  );
};
