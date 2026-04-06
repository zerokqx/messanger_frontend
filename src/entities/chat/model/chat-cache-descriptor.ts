import type {
  MessageItem,
  PrivateChatHistoryResponse,
  PrivateChatListItem,
  PrivateChatListResponse,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import {
  getGetListPrivateChatsListGetInfiniteQueryKey,
  getGetPrivateChatHistoryHistoryGetInfiniteQueryKey,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { queryClient } from '@/shared/api';
import {
  infinityQueryOptimisticInsert,
  infinityQueryOptimisticRemove,
  infinityQueryOptimisticUpdate,
} from '@/shared/lib/infinity-query-optimistic-update';
import { CacheDescriptor } from '@/shared/model/cache-descriptor';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';


type ChatListCache = InfiniteData<PrivateChatListResponse>;
type ChatHistoryCache = InfiniteData<PrivateChatHistoryResponse>;

/**
 * Инкапсулирует работу с кешем приватного чата.
 * Отвечает за список чатов, историю сообщений и локальные read/update/delete
 * операции без прямых API-запросов.
 */
export class ChatCacheDescriptor extends CacheDescriptor<
  PrivateChatListItem,
  [data?: PrivateChatListItem[]]
> {
  private static readonly instances = new WeakMap<
    QueryClient,
    Map<string, ChatCacheDescriptor>
  >();

  /**
   * Возвращает singleton-инстанс дескриптора для пары
   * `queryClient + chatId`.
   */
  static getInstance(chatId: string, client: QueryClient = queryClient) {
    let clientInstances = this.instances.get(client);

    if (!clientInstances) {
      clientInstances = new Map();
      this.instances.set(client, clientInstances);
    }

    const existing = clientInstances.get(chatId);
    if (existing) {
      return existing;
    }

    const descriptor = new ChatCacheDescriptor(chatId, client);
    clientInstances.set(chatId, descriptor);

    return descriptor;
  }

  private constructor(chatId: string, client: QueryClient = queryClient) {
    super(chatId, client);
  }

  /** Возвращает ключ infinite-query для списка приватных чатов. */
  getChatListQueryKey(
    params?: Parameters<typeof getGetListPrivateChatsListGetInfiniteQueryKey>[0]
  ) {
    return getGetListPrivateChatsListGetInfiniteQueryKey(params);
  }

  /** Возвращает ключ infinite-query для истории текущего чата. */
  getChatHistoryQueryKey(
    params?: Omit<
      NonNullable<
        Parameters<typeof getGetPrivateChatHistoryHistoryGetInfiniteQueryKey>[0]
      >,
      'chat_id'
    >
  ) {
    return getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
      ...params,
      chat_id: this.cacheId,
    });
  }

  /**
   * Ищет чат по `chat_id`.
   * Если список уже передан снаружи, использует его.
   * Иначе делает линейный поиск по данным из query cache.
   */
  search(data?: PrivateChatListItem[]) {
    if (data) {
      return data.find((chat) => chat.chat_id === this.cacheId);
    }

    const cachedLists = this.client.getQueriesData<ChatListCache>({
      queryKey: this.getChatListQueryKey(),
    });

    for (const [, chatList] of cachedLists) {
      if (!chatList) {
        continue;
      }

      for (const page of chatList.pages) {
        const found = page.data.items.find(
          (chat) => chat.chat_id === this.cacheId
        );

        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }

  /** Добавляет чат в начало первой страницы списка. */
  async create(chat: PrivateChatListItem) {
    const nextChat = {
      ...chat,
      chat_id: this.cacheId,
    };

    await this.client.cancelQueries({
      queryKey: this.getChatListQueryKey(),
    });

    this.client.setQueriesData<ChatListCache>(
      { queryKey: this.getChatListQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticInsert(
          old,
          (page) => page.data.items,
          nextChat,
          'start'
        );
      }
    );
  }

  /** Полностью обновляет чат в кеше по `chat_id`. */
  async update(chat: PrivateChatListItem) {
    return this.partialUpdate({
      ...chat,
      chat_id: this.cacheId,
    });
  }

  /**
   * Частично обновляет чат в списке через optimistic helper.
   * Подходит для `unread_count`, `last_message`, `chat_data` и других полей.
   */
  async partialUpdate(patch: Partial<PrivateChatListItem>) {
    await this.client.cancelQueries({
      queryKey: this.getChatListQueryKey(),
    });

    this.client.setQueriesData<ChatListCache>(
      { queryKey: this.getChatListQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticUpdate(
          old,
          (page) => page.data.items,
          (item) => item.chat_id === this.cacheId,
          (draft) => {
            Object.assign(draft, patch, { chat_id: this.cacheId });
          }
        );
      }
    );
  }

  /**
   * Помечает все сообщения текущего чата как прочитанные только в кеше.
   * Дополнительно сбрасывает `unread_count` и обновляет `last_message`
   * в списке чатов.
   */
  async markAllRead() {
    await this.client.cancelQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });

    this.client.setQueriesData<ChatHistoryCache>(
      { queryKey: this.getChatHistoryQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticUpdate(
          old,
          (page) => page.data.items,
          () => true,
          (draft) => {
            draft.is_viewed = true;
          }
        );
      }
    );

    await this.client.cancelQueries({
      queryKey: this.getChatListQueryKey(),
    });

    this.client.setQueriesData<ChatListCache>(
      { queryKey: this.getChatListQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticUpdate(
          old,
          (page) => page.data.items,
          (item) => item.chat_id === this.cacheId,
          (draft) => {
            draft.unread_count = 0;

            if (draft.last_message) {
              draft.last_message.is_viewed = true;
            }
          }
        );
      }
    );
  }

  /**
   * Обновляет превью чата на основе сообщения.
   * Используется для локального синка `last_message` и `unread_count`.
   */
  async updateFromMessage(
    message: MessageItem,
    options?: {
      unreadCount?: number;
      incrementUnreadCount?: boolean;
    }
  ) {
    const patch: Partial<PrivateChatListItem> = {
      last_message: {
        ...message,
        chat_id: this.cacheId,
      },
    };

    if (typeof options?.unreadCount === 'number') {
      patch.unread_count = options.unreadCount;
    }

    return this.partialUpdate(patch).then(async () => {
      if (!options?.incrementUnreadCount) {
        return;
      }

      await this.client.cancelQueries({
        queryKey: this.getChatListQueryKey(),
      });

      this.client.setQueriesData<ChatListCache>(
        { queryKey: this.getChatListQueryKey() },
        (old) => {
          if (!old) {
            return old;
          }

          return infinityQueryOptimisticUpdate(
            old,
            (page) => page.data.items,
            (item) => item.chat_id === this.cacheId,
            (draft) => {
              draft.unread_count =
                typeof draft.unread_count === 'number'
                  ? draft.unread_count + 1
                  : 1;
              draft.last_message = {
                ...message,
                chat_id: this.cacheId,
              };
            }
          );
        }
      );
    });
  }

  /**
   * Удаляет чат из списка и очищает локальный кеш истории.
   * Работает только с React Query cache.
   */
  async delete() {
    await this.client.cancelQueries({
      queryKey: this.getChatListQueryKey(),
    });

    this.client.setQueriesData<ChatListCache>(
      { queryKey: this.getChatListQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticRemove(
          old,
          (page) => page.data.items,
          (item) => item.chat_id === this.cacheId
        );
      }
    );

    this.client.removeQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });
  }
}

export type ChatListQueryKey = ReturnType<
  ChatCacheDescriptor['getChatListQueryKey']
>;
export type ChatHistoryQueryKey = ReturnType<
  ChatCacheDescriptor['getChatHistoryQueryKey']
>;
