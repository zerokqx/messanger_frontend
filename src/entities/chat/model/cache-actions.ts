import type { ChatPrivateNewMessageSocketEvent } from '@/shared/api';
import type {
  PrivateChatListItem,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useChatList } from '../api';
import Logger from '@/shared/lib/logger/logger';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ChatCacheDescriptor } from './chat-cache-descriptor';

export const useCreateChatFromSocketEvent = () => {
  const queryClient = useQueryClient();
  const { data } = useChatList();

  return useCallback(
    async ({
      payload: { chat_id, content, ...payload },
    }: ChatPrivateNewMessageSocketEvent) => {
      const descriptor = ChatCacheDescriptor.getInstance(chat_id, queryClient);
      const existingChat = descriptor.search(data);

      console.log('💬 [SOCKET-CACHE] Creating/updating chat from socket event', {
        chat_id,
        has_existing_chat: Boolean(existingChat),
        payload,
      });

      if (!existingChat) {
        console.log('➕ [SOCKET-CACHE] Chat not in list, adding to first page');
        Logger.debug('cache-actions.tsx', 'Add New Chats', payload);
        await descriptor.create({
          unread_count: 1,
          chat_id,
          chat_type: 'private',
          created_at: payload.created_at,
          chat_companion_ids: [payload.sender_id],
          last_message: {
            ...payload,
            chat_id,
            content,
          },
        } satisfies PrivateChatListItem);
        console.log('✅ [SOCKET-CACHE] Chat added to list');
      } else {
        console.log('ℹ️ [SOCKET-CACHE] Chat already exists in list, updating');
        await descriptor.partialUpdate({
          last_message: {
            ...payload,
            chat_id,
            content,
          },
        });
      }
    },
    [data, queryClient]
  );
};
