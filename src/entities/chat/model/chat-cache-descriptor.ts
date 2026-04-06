import type {
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
import {
  CacheDescriptor,
  type ReplaceOptions,
} from '@/shared/model/cache-descriptor';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { produce } from 'immer';


type ChatListCache = InfiniteData<PrivateChatListResponse>;
type ChatHistoryCache = InfiniteData<PrivateChatHistoryResponse>;
type ResetUnreadOfChat = () => void | Promise<void>;

interface MarkReadOptions {
  userId?: string;
  resetUnreadOfChat?: boolean;
}

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
  search(data?: PrivateChatListItem[]): PrivateChatListItem | undefined {
    if (data) {
      return data.find((chat) => chat.chat_id === this.cacheId);
    }

    const cachedLists = this.getCacheSnapshot<ChatListCache>(
      this.getChatListQueryKey()
    );

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

  /**
   * Возвращает текущий чат, к которому привязан дескриптор.
   * Если плоский список уже передан снаружи, использует его.
   * Иначе ищет чат в query cache.
   */
  getCache(data?: PrivateChatListItem[]): PrivateChatListItem | undefined {
    return this.search(data);
  }

  /**
   * Полностью заменяет найденный чат в кеше списка.
   * По умолчанию проверяет, что replacement-данные содержат все ключи
   * текущего объекта; `forceReplace` отключает эту проверку.
   */
  async replace(
    predicate: (entity: PrivateChatListItem) => boolean,
    data: Partial<PrivateChatListItem>,
    options?: ReplaceOptions
  ) {
    await this.client.cancelQueries({
      queryKey: this.getChatListQueryKey(),
    });

    this.client.setQueriesData<ChatListCache>(
      { queryKey: this.getChatListQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return produce(old, (draft) => {
          draft.pages.forEach((page) => {
            page.data.items = page.data.items.map((item) => {
              if (!predicate(item)) {
                return item;
              }

              this.validateReplacementShape(item, data, options);

              return {
                ...data,
                chat_id: this.cacheId,
              } as PrivateChatListItem;
            });
          });
        });
      }
    );

    return this.getChatListQueryKey();
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
    return this.replace(
      (item) => item.chat_id === this.cacheId,
      {
        ...chat,
        chat_id: this.cacheId,
      },
      { forceReplace: true }
    );
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
   * Помечает сообщения текущего чата как прочитанные только в кеше.
   * Если передан `userId`, обновляются только сообщения этого отправителя.
   * Если включён `resetUnreadOfChat`, внешний callback должен сам обнулить
   * счётчик непрочитанных у чата.
   */
  async markRead(
    options?: MarkReadOptions,
    resetUnreadOfChat?: ResetUnreadOfChat
  ) {
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
          (item) =>
            options?.userId ? item.sender_id === options.userId : true,
          (draft) => {
            draft.is_viewed = true;
          }
        );
      }
    );

    if (options?.resetUnreadOfChat) {
      if (!resetUnreadOfChat) {
        throw new Error(
          'markRead with resetUnreadOfChat=true requires external reset callback'
        );
      }

      await resetUnreadOfChat();
    }

    return this.getChatHistoryQueryKey();
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
