import { ChatCard, useChatList } from '@/entities/chat';
import { hasUserId } from '@/entities/chat/lib/has-user-id';
import { selectedChatAction } from '@/features/chat';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { pagesMap } from '@/shared/lib/pages-map';
import {
  useNavigate,
} from '@tanstack/react-router';
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
              layoutAction.doSetAside(true)
              selectedChatAction.doSelect(chat.chat_id);
              void navigate({
                hash: hasUserId(chat.chat_data ?? null),
              });
            }}
            chat={chat}
          />
        );
      }}
    />
  );
};
