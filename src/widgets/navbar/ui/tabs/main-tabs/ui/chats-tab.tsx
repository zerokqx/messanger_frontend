import { ChatCard, useChatList, useSelectedChat } from '@/entities/chat';
import { hasUserId } from '@/entities/chat/lib/has-user-id';
import { urlAvatar } from '@/entities/user';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { formatLogin } from '@/shared/lib/formaters';
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
      computeItemKey={(_, chat) => chat.chat_id}
      increaseViewportBy={150}
      itemContent={(_, chat) => {
        const profile = chat.chat_data as unknown as ProfileByUserIdData;
        return (
          <ChatCard
            onClick={() => {
              setChat(chat.chat_id);
              void navigate({
                hash: hasUserId(chat.chat_data ?? null),
              });
            }}
             unreadCount={chat.unread_count}
            ids={{
              chatId: chat.chat_id,
              userId: profile.user_id,
            }}
            isActive={chat.chat_id === selectedChatId}
            preview={{
              content: chat.last_message?.content ?? '',
              createdAt: chat.last_message?.created_at ?? '',
            }}
            displayName={formatLogin(profile.login, profile.custom_name).name}
            avatarSrc={urlAvatar(
              profile.user_id,
              profile.avatars?.current?.file_id
            )}
          />
        );
      }}
    />
  );
};
