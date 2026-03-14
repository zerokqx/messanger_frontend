import type { CSSProperties, ReactNode } from 'react';
import type { components } from '@/shared/types/v1';

export type MessageItem = components['schemas']['MessageItem'];
export type ChatListItem = components['schemas']['PrivateChatListItem'];

export interface MessageProps {
  message: MessageItem;
  isOwn?: boolean;
  senderName?: string;
  avatarLabel?: string;
  withAvatar?: boolean;
  withSenderName?: boolean;
  rightSection?: ReactNode;
}

export interface SystemMessageProps {
  message: MessageItem;
}

export interface MessageListItem extends MessageProps {
  message: MessageItem;
}

export interface MessageContainerProps {
  items: MessageListItem[];
  style?: CSSProperties;
  increaseViewportBy?: number;
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
