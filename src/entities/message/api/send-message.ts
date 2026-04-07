import { assign } from 'lodash';
import { useMeUserId } from '@/entities/viewer';
import type { PrivateMessageSendRequest } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useSendPrivateMessageWithUuidMessageSendPost } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { MessageCacheDescriptor } from '../model/message-cache-descriptor';
import type { UiMessage } from '../model';
import { ChatCacheDescriptor } from '@/entities/chat';

export type Message = PrivateMessageSendRequest;

/**
 * Отправляет сообщение и делает optimistic обновление только для
 * сообщений текущего пользователя.
 */
export const useSendMessage = () => {
  const { data: meUserId } = useMeUserId();

  return useSendPrivateMessageWithUuidMessageSendPost({
    mutation: {
      async onMutate({ data }, context) {
        const descriptorMessage = MessageCacheDescriptor.getInstance(
          data.chat_id,
          context.client
        );
        const chatDescriptor = ChatCacheDescriptor.getInstance(
          data.chat_id,
          context.client
        );
        const optimisticMessageId = descriptorMessage.generateMessageId();

        const optimisticMessage: UiMessage = {
          message_id: optimisticMessageId,
          chat_id: data.chat_id,
          content: data.content ?? null,
          message_type: data.message_type,
          sender_id: meUserId,
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

        await descriptorMessage.create(optimisticMessage);
        await chatDescriptor.partialUpdate({
          last_message: optimisticMessage,
        });

        return { descriptor: descriptorMessage, optimisticMessageId };
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
