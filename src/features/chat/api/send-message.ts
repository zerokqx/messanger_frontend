import {
  getGetPrivateChatHistoryHistoryGetInfiniteQueryKey,
  useSendPrivateMessageWithUuidMessageSendPost,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import type { PrivateMessageSendRequest } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { History } from 'lucide-react';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import { useMe } from '@/entities/user/model/me.query';
import { mkOptimisticMessage, type MkOptimisticMessageOptions } from '../lib';
import type {
  OptimisticHistoryData,
  OptimisticHistoryResponse,
} from '@/entities/chat';

export type Message = PrivateMessageSendRequest;
type History = InfiniteData<OptimisticHistoryResponse>;


export const useAddMessageToHistory = () => {
  const queryClient = useQueryClient();

  return async (data: MkOptimisticMessageOptions, key: readonly unknown[]) => {
    await queryClient.cancelQueries({ queryKey: key });
    const prevHistory = queryClient.getQueriesData<History>({
      queryKey: key,
    });

    queryClient.setQueriesData<History>({ queryKey: key }, (old) => {
      if (!old) return old;

      return infinityQueryOptimisticInsert<
        OptimisticHistoryResponse,
        OptimisticHistoryData['items'][number]
      >(old, (page) => page.data.items, mkOptimisticMessage(data), 'start');
    });
    return prevHistory;
  };
};

export const useSendMessage = () => {
  return useSendPrivateMessageWithUuidMessageSendPost();
};
