import { useSendPrivateMessageWithUuidMessageSendPost } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import type { PrivateMessageSendRequest } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';

export type Message = PrivateMessageSendRequest;

export const useSendMessage = () => {
  return useSendPrivateMessageWithUuidMessageSendPost();
};
