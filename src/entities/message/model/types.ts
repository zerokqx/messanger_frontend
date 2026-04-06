import type {
  MessageItem,
  PrivateChatHistoryData,
  PrivateChatHistoryResponse,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';

/** Сообщение сервера из истории чата или socket-события. */
export type HistoryMessage = MessageItem;

/** Варианты сообщения, которые приходят с бэкенда. */
export type MessageVariant = MessageItem['message_type'][number];

/**
 * Клиентская модель сообщения.
 * `isOptimistic` помечает локально вставленные сообщения, которые
 * ещё не подтверждены сервером.
 */
export type UiMessage = MessageItem & {
  isOptimistic?: boolean;
};

/** Страница истории, адаптированная под optimistic обновления. */
export type OptimisticHistoryData = Omit<PrivateChatHistoryData, 'items'> & {
  items: UiMessage[];
};

/** Ответ истории, адаптированный под optimistic обновления. */
export type OptimisticHistoryResponse = Omit<
  PrivateChatHistoryResponse,
  'data'
> & {
  data: OptimisticHistoryData;
};
