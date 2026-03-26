import type { MessageItem } from './orval/chat-private-service/chat-private-service.schemas';
import type { ProfileByUserIdData } from './orval/profile-service/profile-service.schemas';

export interface SocketEvent<
  TEvent extends string = string,
  TPayload = unknown,
> {
  event: TEvent;
  target_user_id: string;
  payload: TPayload;
}

export type ChatPrivateMessagePayload = Omit<MessageItem, 'sender_data'> & {
  sender_data: ProfileByUserIdData | null;
};

export type ChatPrivateNewMessageSocketEvent = SocketEvent<
  'chat_private:new_message',
  ChatPrivateMessagePayload
>;
