import type { CSSProperties, Key, ReactNode } from 'react';
import type { components } from '@/shared/types/v1';

export type ChatMessage =
  components['schemas']['PrivateChatHistoryResponse']['data']['items'][number];
export type ChatListItem = components['schemas']['PrivateChatListItem'];

export interface MessageProps {
  message: ChatMessage;
  isOwn?: boolean;
  senderName?: string;
  avatarLabel?: string;
  withAvatar?: boolean;
  withSenderName?: boolean;
  rightSection?: ReactNode;
}

export interface SystemMessageProps {
  message: ChatMessage;
}

export interface MessageContainerProps {
  messages: ChatMessage[];
  style?: CSSProperties;
  increaseViewportBy?: number | { top: number; bottom: number };
  initialTopMostItemIndex?: number;
  startReached?: () => void | Promise<void>;
  followOutput?: (isAtBottom: boolean) => 'auto' | false;
  computeItemKey?: (index: number, item: ChatMessage) => Key;
}

export interface ChatCompound {
  (props: MessageContainerProps): ReactNode;
  Message: (props: MessageProps) => ReactNode;
  SystemMessage: (props: SystemMessageProps) => ReactNode;
}

export interface ChatCardProps {
  chat: ChatListItem;
  isActive?: boolean;
  title?: string;
  onClick?: () => void;
}
