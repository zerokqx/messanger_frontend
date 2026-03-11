import { ChatContainer } from './chat-container';
import { MessageItem } from './message-item';
import { SystemMessage } from './system-message';
import type { ChatCompound } from './types';

export const Chat = Object.assign(ChatContainer, {
  Message: MessageItem,
  SystemMessage,
}) as ChatCompound;
