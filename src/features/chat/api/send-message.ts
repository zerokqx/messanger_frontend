import {
  getGetPrivateChatHistoryHistoryGetInfiniteQueryKey,
  useSendPrivateMessageWithUuidMessageSendPost,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import type {
  PrivateChatHistoryData,
  PrivateChatHistoryResponse,
  PrivateMessageSendRequest,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { History } from 'lucide-react';
import {
  infinityQueryOptimisticInsert,
  infinityQueryOptimisticUpdate,
} from '@/shared/lib/infinity-query-optimistic-update';
import { mkOptimisticMessage, type MkOptimisticMessageOptions } from '../lib';
import type {
  OptimisticHistoryData,
  OptimisticHistoryResponse,
} from '@/entities/chat';
import { queryClient } from '@/shared/api';
import { useMeUserId } from '@/entities/user';
import { assign } from 'lodash';

export type Message = PrivateMessageSendRequest;
type History = InfiniteData<OptimisticHistoryResponse>;

export const useAddMessageToHistory = () => {
  // const markRead = useMarkPrivateChatReadMessageMarkReadPost();
  const queryClient = useQueryClient();

  return async (data: MkOptimisticMessageOptions, key: readonly unknown[]) => {
    console.log('💬 [SEND-MESSAGE] Adding message to history', {
      data,
      queryKey: key,
    });
    
    await queryClient.cancelQueries({ queryKey: key });
    const prevHistory = queryClient.getQueriesData<History>({
      queryKey: key,
    });
    
    console.log('📊 [SEND-MESSAGE] Previous history state:', prevHistory);

    queryClient.setQueriesData<History>({ queryKey: key }, (old) => {
      console.log('📝 [SEND-MESSAGE] Setting new history data, old state:', old);
      
      if (!old) {
        console.warn('⚠️ [SEND-MESSAGE] No history data found, cannot add message');
        return old;
      }
      // void markRead.mutateAsync({
      //   data: { chat_id: data.chat_id, mark_all: true },
      // });

      const result = infinityQueryOptimisticInsert<
        OptimisticHistoryResponse,
        OptimisticHistoryData['items'][number]
      >(old, (page) => page.data.items, mkOptimisticMessage(data), 'start');
      
      console.log('✅ [SEND-MESSAGE] New history state:', result);
      return result;
    });
    return prevHistory;
  };
};

export const useSendMessage = () => {
  const { data: meUserId } = useMeUserId();
  return useSendPrivateMessageWithUuidMessageSendPost({
    mutation: {
      onMutate({ data }, context) {
        const tempId = Date.now() + Math.floor(Math.random() * 1e6);
        const historyQueryKey =
          getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
            chat_id: data.chat_id,
          });
        const prevHistory = context.client.getQueriesData<
          InfiniteData<PrivateChatHistoryResponse>
        >({
          queryKey: historyQueryKey,
        });
        console.log(prevHistory);

        context.client.setQueriesData<InfiniteData<PrivateChatHistoryResponse>>(
          { queryKey: historyQueryKey },
          (old) => {
            if (!old) return old;
            return infinityQueryOptimisticInsert<
              PrivateChatHistoryResponse,
              PrivateChatHistoryData['items'][number]
            >(old, (page) => page.data.items, {
              ...data,
              created_at: new Date().toISOString(),
              forward_metadata: null,
              message_id: tempId,
              is_viewed: false,
              sender_id: meUserId,
            });
          }
        );
        return { tempId, historyQueryKey };
      },
      onSuccess(data, variables, { historyQueryKey, tempId }, context) {
        context.client.setQueriesData<InfiniteData<PrivateChatHistoryResponse>>(
          { queryKey: historyQueryKey },
          (old) => {
            if (!old) return old;
            return infinityQueryOptimisticUpdate<
              PrivateChatHistoryResponse,
              PrivateChatHistoryData['items'][number]
            >(
              old,
              (page) => page.data.items,
              (item) => item.message_id === tempId,
              (draft) => assign(draft, data.data)
            );
          }
        );
      },
    },
  });
};
