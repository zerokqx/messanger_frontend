import type { CSSProperties, Key } from 'react';
import type { HistoryMessage, UiMessage } from '../model';

/** Пропсы текстового пузыря сообщения. */
export interface MessageTextProps {
  isEdit?: boolean;
  isError?: boolean;
  userIdOfCurrentUser: string;
  message: UiMessage;
}

/** Пропсы строки системного сообщения. */
export interface SystemMessageProps {
  message: HistoryMessage;
}

/** Пропсы простого виртуализированного списка сообщений. */
export interface MessageListProps {
  messages: UiMessage[];
  currentUserId?: string;
  style?: CSSProperties;
  increaseViewportBy?: number | { top: number; bottom: number };
  initialTopMostItemIndex?: number;
  startReached?: () => void | Promise<void>;
  followOutput?: (isAtBottom: boolean) => 'auto' | false;
  computeItemKey?: (index: number, item: UiMessage) => Key;
}
