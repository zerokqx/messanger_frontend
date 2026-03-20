import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ActionIcon, Alert, Box, Group, Input, Stack } from '@mantine/core';
import { ArrowLeft, CircleSlash } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import z from 'zod';

import {  useChatHistory } from '@/entities/chat';
import { MessageItem } from '@/entities/chat/ui/message-item';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import { RoundedContainerGroup } from '@/shared/ui/boxes';

const uuidSchema = z.uuid();
const VIRTUOSO_START_INDEX = 100000;

export const ChatWidget = () => {
  const chatId = useRouterState({ select: (state) => state.location.hash });
  const navigate = useNavigate();

  const isValidChatId = uuidSchema.safeParse(chatId).success;

  const {
    data: historyChat,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatHistory(isValidChatId ? chatId : '');

  const [firstItemIndex, setFirstItemIndex] = useState(VIRTUOSO_START_INDEX);

  const isLoadingMoreRef = useRef(false);
  const isAtTopRef = useRef(false);
  const hasNextPageRef = useRef(false);

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
    ) {
      return;
    }

    isLoadingMoreRef.current = true;

    try {
      const result = await fetchNextPage();
      const newPage = result.data?.pages.at(-1);
      const addedCount = newPage?.data.items.length ?? 0;

      if (addedCount > 0) {
        setFirstItemIndex((prev) => prev - addedCount);
      }
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [fetchNextPage, isFetchingNextPage]);
  return (
    <Stack h="100%" mih={0} gap={0}>
      <RoundedContainerGroup bdrs={0} style={{ zIndex: 100 }} w="100%">
        <ActionIcon
          onClick={() => {
            void navigate({ hash: '' });
          }}
        >
          <ArrowLeft />
        </ActionIcon>
      </RoundedContainerGroup>

      {isValidChatId ? (
        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Virtuoso
            data={messages}
            firstItemIndex={firstItemIndex}
            style={{ height: '100%' }}
            initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 1000,
              exit: (velocity) => Math.abs(velocity) < 500,
            }}
            followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
            computeItemKey={(_, item) => String(item.message_id)}
            atTopStateChange={(atTop) => {
              isAtTopRef.current = atTop;
            }}
            startReached={() => {
              isAtTopRef.current = true;
              void loadMore();
            }}
            increaseViewportBy={{ top: 400, bottom: 200 }}
            itemContent={(_, item) => {
              if (item.message_type.includes('system')) {
                return <SystemMessage message={item} />;
              }

              return <MessageItem message={item} />;
            }}
          />
        </Box>
      ) : (
        <Alert icon={<CircleSlash size={16} />}>Chat is not selected</Alert>
      )}

      <Group w="100%" justify="center" p="xs">
        <Input w="30rem" />
      </Group>
    </Stack>
  );
};
