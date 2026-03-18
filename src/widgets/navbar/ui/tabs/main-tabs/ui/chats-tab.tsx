import { ChatCard, useChatList } from '@/entities/chat';
import { pagesMap } from '@/shared/lib/pages-map';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useHash } from '@mantine/hooks';
import { Virtuoso } from 'react-virtuoso';

export const ChatsTab = () => {
  const {
    data: chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChatList();
  const chatsMap = pagesMap(chats);
  const [,setHash] = useHash()
  const setChatId = useSetUuidForRouter()

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
              setHash(chat.chat_id)
            }}
            chat={chat}
          />
        );
      }}
    />
  );
};
