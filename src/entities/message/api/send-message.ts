import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import { assign } from 'lodash';
import { useMeUserId } from '@/entities/user';
import type { PrivateMessageSendRequest } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useSendPrivateMessageWithUuidMessageSendPost } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { MessageCacheDescriptor } from '../model/message-cache-descriptor';
import type { MessageHistoryQueryKey, UiMessage } from '../model';

export type Message = PrivateMessageSendRequest;

/**
 * Добавляет готовое сообщение в кеш истории конкретного чата.
 * Используется и для payload из сокета, и для optimistic вставки.
 */
export const addRawMessage = async (
  queryClient: QueryClient,
  message: UiMessage
): Promise<MessageHistoryQueryKey> => {
  const descriptor = MessageCacheDescriptor.getInstance(
    message.chat_id,
    queryClient
  );
  return descriptor.create(message);
};

/**
 * Хук-обёртка над `addRawMessage`, которая берёт `QueryClient`
 * из контекста TanStack Query.
 */
export const useAddRawMessage = () => {
  const queryClient = useQueryClient();

  return (message: UiMessage) => addRawMessage(queryClient, message);
};

/**
 * Отправляет сообщение и делает optimistic обновление только для
 * сообщений текущего пользователя.
 */
export const useSendMessage = () => {
  const { data: meUserId } = useMeUserId();

  return useSendPrivateMessageWithUuidMessageSendPost({
    mutation: {
      async onMutate({ data }, context) {
        const descriptor = MessageCacheDescriptor.getInstance(
          data.chat_id,
          context.client
        );
        const optimisticMessageId = descriptor.generateMessageId();
        const optimisticMessage: UiMessage = {
          message_id: optimisticMessageId,
          chat_id: data.chat_id,
          content: data.content ?? null,
          message_type: data.message_type,
          sender_id: meUserId ,
          forward_metadata: null,
          sender_data: null,
          media_link: null,
          is_viewed: false,
          viewed_at: null,
          created_at: new Date().toISOString(),
          updated_at: null,
          is_edited: false,
          isOptimistic: true,
        };

        await addRawMessage(context.client, optimisticMessage);

        return { descriptor, optimisticMessageId };
      },
      onSuccess(data, _variables, mutationContext) {
        void mutationContext.descriptor.update(
          mutationContext.optimisticMessageId,
          (draft) => {
            assign(draft, data.data);
            draft.isOptimistic = false;
          }
        );
      },
    },
  });
};
