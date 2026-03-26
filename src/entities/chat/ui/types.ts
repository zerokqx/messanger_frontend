import type { CSSProperties, Key, ReactNode } from 'react';
import type { components } from '@/shared/types/v1';
import type {
  MessageItem,
  PrivateChatHistoryData,
  PrivateChatHistoryResponse,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import type { SetOptional } from 'type-fest';

export type ChatMessage =
  components['schemas']['PrivateChatHistoryResponse']['data']['items'][number];

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
  Message: (props: MessageTextProps) => ReactNode;
  SystemMessage: (props: SystemMessageProps) => ReactNode;
}

export interface MessageBaseProps {
  isEdit?: boolean;
  isError?: boolean;
  avatarName?: string;
  avatarSrc?: string;
  userIdOfCurrentUser: string;
  message: UiMessage;
}

export interface MessageTextProps extends MessageBaseProps {}

export interface ChatParticipantUi {
  userId?: string;
  avatarName?: string;
  avatarSrc?: string;
}
export type UiMessage = SetOptional<MessageItem, 'message_id'> & {
  isOptimistic?: boolean;
  client_id?: string;
};

export type OptimisticHistoryData = Omit<PrivateChatHistoryData, 'items'> & {
  items: UiMessage[];
};
export type OptimisticHistoryResponse = {
  data: OptimisticHistoryData;
} & PrivateChatHistoryResponse;
