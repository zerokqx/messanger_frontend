import type { ChatPrivateNewMessageSocketEvent } from '@/shared/api';
import type {
  PrivateChatListItem,
  PrivateChatListResponse,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { getGetListPrivateChatsListGetInfiniteQueryKey } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useChatList } from '../api';
import Logger from '@/shared/lib/logger/logger';
import { useCallback } from 'react';

export const useCreateChatFromSocketEvent = () => {
  const queryClient = useQueryClient();
  const { data } = useChatList();

  return useCallback(
    async ({
      payload: { chat_id, content, ...payload },
    }: ChatPrivateNewMessageSocketEvent) => {
      console.log('💬 [SOCKET-CACHE] Creating/updating chat from socket event', {
        chat_id,
        has_existing_chat: data?.some((chat) => chat.chat_id === chat_id),
        payload,
      });
      
      const privateClatListQueryKey =
        getGetListPrivateChatsListGetInfiniteQueryKey();
      // const prevPrivateChatList = queryClient.getQueriesData<ChatInfinite>({
      //   queryKey: privateClatListQueryKey,
      // });

      if (!data?.some((chat) => chat.chat_id === chat_id)) {
        console.log('➕ [SOCKET-CACHE] Chat not in list, adding to first page');
        queryClient.setQueriesData<InfiniteData<PrivateChatListResponse>>(
          { queryKey: privateClatListQueryKey },
          (old) => {
            Logger.debug('cache-actions.tsx', 'Add New Chats', payload);
            if (!old) {
              console.warn('⚠️ [SOCKET-CACHE] No existing chat list data, creating initial');
              return old;
            }
            return infinityQueryOptimisticInsert<
              PrivateChatListResponse,
              PrivateChatListItem
            >(
              old,
              (page) => page.data.items,
              {
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
              },
              'start'
            );
          }
        );
        console.log('✅ [SOCKET-CACHE] Chat added to list');
      } else {
        console.log('ℹ️ [SOCKET-CACHE] Chat already exists in list, updating');
      }
      await queryClient.invalidateQueries({
        queryKey: privateClatListQueryKey,
      });
    },
    [data, queryClient]
  );
};

export const useChatUpdate = () => {};
