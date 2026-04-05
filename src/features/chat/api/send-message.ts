import {
  getGetListPrivateChatsListGetInfiniteQueryKey,
  getGetPrivateChatHistoryHistoryGetInfiniteQueryKey,
  useSendPrivateMessageWithUuidMessageSendPost,
  type GetListPrivateChatsListGetInfiniteQueryResult,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
<<<<<<< Updated upstream
import type { PrivateMessageSendRequest } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
||||||| Stash base
import type {
  PrivateChatHistoryData,
  PrivateChatHistoryResponse,
  PrivateMessageSendRequest,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
=======
import type {
  PrivateChatHistoryData,
  PrivateChatHistoryResponse,
  PrivateChatListItem,
  PrivateChatListResponse,
  PrivateMessageSendRequest,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
>>>>>>> Stashed changes
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { History } from 'lucide-react';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import { useMe } from '@/entities/user/model/me.query';
import { mkOptimisticMessage, type MkOptimisticMessageOptions } from '../lib';
import {
  useChatUserId,
  type OptimisticHistoryData,
  type OptimisticHistoryResponse,
} from '@/entities/chat';
<<<<<<< Updated upstream
||||||| Stash base
import { queryClient } from '@/shared/api';
import { useMeUserId } from '@/entities/user';
import { assign } from 'lodash';
=======
import { queryClient } from '@/shared/api';
import { useMeUserId } from '@/entities/user';
import { assign } from 'lodash';
import {
  getGetUserProfileByUserIdUserIdGetQueryKey,
  getUserProfileByUserIdUserIdGet,
} from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import type {
  ProfileByUserIdResponse,
  ProfileByUserIdsResponse,
} from '@/shared/api/orval/profile-service/profile-service.schemas';
import produce from 'immer';
>>>>>>> Stashed changes

export type Message = PrivateMessageSendRequest;
type History = InfiniteData<OptimisticHistoryResponse>;
type HistoryData = OptimisticHistoryData;


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

let debouncedPrivateChatList;
export const useSendMessage = () => {
<<<<<<< Updated upstream
  return useSendPrivateMessageWithUuidMessageSendPost();
||||||| Stash base
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
=======
  const recipientUserId = useChatUserId();
  const { data: meUserId } = useMeUserId();
  return useSendPrivateMessageWithUuidMessageSendPost({
    mutation: {
      onMutate({ data }, context) {
        const tempId = Date.now() + Math.floor(Math.random() * 1e6);
        const clientId = crypto.randomUUID();
        const chatPrivateListQueryKey =
          getGetListPrivateChatsListGetInfiniteQueryKey();
        const previousChatPrivateList = context.client.getQueriesData<
          InfiniteData<PrivateChatListResponse>
        >({ queryKey: chatPrivateListQueryKey });
        const messageItem: PrivateChatHistoryData['items'][number] = {
          ...data,
          created_at: new Date().toISOString(),
          forward_metadata: null,
          message_id: tempId,
          is_viewed: false,
          sender_id: meUserId,
        };
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
            >(old, (page) => page.data.items, messageItem);
          }
        );

        if (data.content) {
          context.client.setQueriesData<InfiniteData<PrivateChatListResponse>>(
            { queryKey: chatPrivateListQueryKey },
            (old) => {
              if (!old) return old;
              return infinityQueryOptimisticUpdate<
                PrivateChatListResponse,
                PrivateChatListItem
              >(
                old,
                (page) => page.data.items,
                (item) => item.chat_id === data.chat_id,
                (draft) => {
                  draft.last_message = messageItem;
                }
              );
            }
          );
        }

        return { clientId, tempId, historyQueryKey };
      },
      async onError(error, variables, onMutateResult, context) {
        const userQueryKey = getGetUserProfileByUserIdUserIdGetQueryKey(
          recipientUserId.userId
        );
        const previousHistory = context.client.getQueriesData({
          queryKey: onMutateResult?.historyQueryKey,
        });

        await context.client.invalidateQueries({ queryKey: userQueryKey });
      },
      onSuccess(
        data,
        _variables,
        { clientId, historyQueryKey, tempId },
        context
      ) {
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
>>>>>>> Stashed changes
};
