import { ChatCard, useChatList, useSelectedChat } from '@/entities/chat';
import { hasUserId } from '@/entities/chat/lib/has-user-id';
import { useNavigate } from '@tanstack/react-router';
import { Virtuoso } from 'react-virtuoso';

export const ChatsTab = () => {
  const {
    data: chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChatList();
  const setChat = useSelectedChat((s) => s.set);
  const selectedChatId = useSelectedChat((s) => s.chatId);
  const navigate = useNavigate();
  return (
    <Virtuoso
      data={chats}
      style={{
        height: '100%',
        minHeight: 0,
      }}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      }}
      totalCount={chats?.length}
      computeItemKey={(_, chat) => chat.chat_id}
      increaseViewportBy={150}
      itemContent={(_, chat) => {
        return (
          <ChatCard
            onClick={() => {
              setChat(chat.chat_id);
              void navigate({
                hash: hasUserId(chat.chat_data ?? null),
              });
            }}
            isActive={chat.chat_id === selectedChatId}
            chat={chat}
          />
        );
      }}
    />
  );
};
