import { ChatCard, useChatList } from '@/entities/chat';
import { selectedChatAction } from '@/features/chat';
import { pagesMap } from '@/shared/lib/pages-map';
import { useHash } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { Virtuoso } from 'react-virtuoso';

export const ChatsTab = () => {
  const {
    data: chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChatList();
  const chatsMap = pagesMap(chats);
  const navigate = useNavigate();
  const [, setHash] = useHash();

  return (
    <Virtuoso
      data={chatsMap}
      style={{
        height: '100%',
        minHeight: 0,
      }}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      }}
      totalCount={pagesMap.length}
      computeItemKey={(_, chat) => chat.chat_id}
      increaseViewportBy={150}
      itemContent={(_, chat) => {
        return (
          <ChatCard
            onClick={() => {
              selectedChatAction.doSelect(chat.chat_id);
              setHash(chat.chat_id);
              void navigate({ to: '/y/chat', hash: chat.chat_id });
            }}
            chat={chat}
          />
        );
      }}
    />
  );
};
