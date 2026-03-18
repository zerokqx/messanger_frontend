import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHash } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import {
  ActionIcon,
  Alert,
  Box,
  Group,
  Input,
  Skeleton,
  Stack,
} from '@mantine/core';
import { ArrowLeft, CircleSlash } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import z from 'zod';

import { MessageSkeleton, useChatHistory } from '@/entities/chat';
import { MessageItem } from '@/entities/chat/ui/message-item';
import { SystemMessage } from '@/entities/chat/ui/system-message';
import { useSelectedChat } from '@/features/chat';
import { RoundedContainerGroup } from '@/shared/ui/boxes';

const uuidSchema = z.uuid();
const VIRTUOSO_START_INDEX = 100000;

export const ChatWidget = () => {
  const [hash] = useHash();
  const navigate = useNavigate();
  const reset = useSelectedChat((s) => s.reset);
  const selectedChatId = useSelectedChat((s) => s.data);
  const chatId = selectedChatId || hash.slice(1);
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
    hasNextPageRef.current = Boolean(hasNextPage);
  }, [hasNextPage]);

  useEffect(() => {
    // при смене чата сбрасываем виртуальный базовый индекс
    setFirstItemIndex(VIRTUOSO_START_INDEX);
    isLoadingMoreRef.current = false;
    isAtTopRef.current = false;
  }, [chatId]);

  const messages = useMemo(() => {
    if (!historyChat?.pages) return [];

    // если сервер отдаёт newest -> oldest,
    // то для UI делаем oldest -> newest
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
    const newPage = result.data?.pages?.at(-1);
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
            reset();
            void navigate({ to: '/y', hash: hash.slice(1) });
          }}
        >
          <ArrowLeft />
        </ActionIcon>
      </RoundedContainerGroup>

      {isValidChatId ? (
        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Virtuoso
            key={chatId}
            data={messages}
            firstItemIndex={firstItemIndex}
            style={{ height: '100%' }}
            initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
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
