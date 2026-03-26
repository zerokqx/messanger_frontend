import type { UiMessage } from '@/entities/chat';

export type MkOptimisticMessageOptions = Pick<
  UiMessage,
  'chat_id' | 'content' | 'message_type' | 'sender_id'
>;
export const mkOptimisticMessage = (
  data: MkOptimisticMessageOptions
): UiMessage => {
  return {
    forward_metadata: null,
    sender_data: null,
    content: null,
    media_link: null,
    is_viewed: false,
    viewed_at: null,
    created_at: '',
    is_edited: false,
    updated_at: null,
    isOptimistic: true,
    client_id: crypto.randomUUID(),
    ...data,
  };
};
