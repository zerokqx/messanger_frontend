import {
  type QueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { produce, type Draft } from 'immer';
import { queryClient } from '@/shared/api';
import {
  getGetListPrivateChatsListGetInfiniteQueryKey,
  getGetPrivateChatHistoryHistoryGetInfiniteQueryKey,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { infinityQueryOptimisticInsert } from '@/shared/lib/infinity-query-optimistic-update';
import {
  CacheDescriptor,
  type ReplaceOptions,
} from '@/shared/model/cache-descriptor';
import type {
  OptimisticHistoryData,
  OptimisticHistoryResponse,
  UiMessage,
} from './types';

type History = InfiniteData<OptimisticHistoryResponse>;

/**
 * Инкапсулирует работу с кешем сообщений одного приватного чата.
 * Внутри держит построение ключей запросов и даёт единый API
 * для добавления, обновления и удаления сообщений через Immer.
 */
export class MessageCacheDescriptor extends CacheDescriptor<
  UiMessage,
  [messageId: UiMessage['message_id'], data?: UiMessage[]]
> {
  private static readonly instances = new WeakMap<
    QueryClient,
    Map<string, MessageCacheDescriptor>
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

    const descriptor = new MessageCacheDescriptor(chatId, client);
    clientInstances.set(chatId, descriptor);

    return descriptor;
  }

  private constructor(chatId: string, client: QueryClient = queryClient) {
    super(chatId, client);
  }

  /** Возвращает ключ infinite-query для списка приватных чатов. */
  getChatListQueryKey() {
    return getGetListPrivateChatsListGetInfiniteQueryKey();
  }

  /** Возвращает ключ infinite-query для истории текущего чата. */
  getChatHistoryQueryKey() {
    return getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
      chat_id: this.cacheId,
    });
  }

  /**
   * Ищет сообщение по `message_id`.
   * Если плоский список уже передан снаружи, использует его.
   * Иначе делает линейный поиск по history cache текущего чата.
   */
  search(messageId: UiMessage['message_id'], data?: UiMessage[]) {
    if (data) {
      return data.find((message) => message.message_id === messageId);
    }

    const cachedHistories = this.getCacheSnapshot<History>(
      this.getChatHistoryQueryKey()
    );

    for (const [, history] of cachedHistories) {
      if (!history) {
        continue;
      }

      for (const page of history.pages) {
        const found = page.data.items.find(
          (message) => message.message_id === messageId
        );

        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }

  /**
   * Полностью заменяет найденное сообщение в history cache.
   * По умолчанию проверяет, что replacement-данные содержат все ключи
   * текущего объекта; `forceReplace` отключает эту проверку.
   */
  async replace(
    predicate: (entity: UiMessage) => boolean,
    data: Partial<UiMessage>,
    options?: ReplaceOptions
  ) {
    await this.client.cancelQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });

    this.client.setQueriesData<History>(
      { queryKey: this.getChatHistoryQueryKey() },
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
              } as Draft<OptimisticHistoryData['items'][number]>;
            });
          });
        });
      }
    );

    return this.getChatHistoryQueryKey();
  }

  /** Генерирует локальный `message_id` для optimistic сообщений. */
  generateMessageId() {
    return Date.now() + Math.floor(Math.random() * 1e6);
  }

  /** Добавляет сообщение в начало первой страницы истории. */
  async create(message: UiMessage) {
    const nextMessage = {
      ...message,
      chat_id: this.cacheId,
    };

    await this.client.cancelQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });

    this.client.setQueriesData<History>(
      { queryKey: this.getChatHistoryQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return infinityQueryOptimisticInsert(
          old,
          (page) => page.data.items,
          nextMessage
        );
      }
    );

    return this.getChatHistoryQueryKey();
  }

  /** Обновляет сообщение в кеше по `message_id` через Immer. */
  async update(
    messageId: UiMessage['message_id'],
    updateFn: (draft: Draft<UiMessage>) => void
  ) {
    await this.client.cancelQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });

    this.client.setQueriesData<History>(
      { queryKey: this.getChatHistoryQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map((page) =>
            produce(page, (draftPage) => {
              draftPage.data.items.forEach((item) => {
                if (item.message_id === messageId) {
                  updateFn(item);
                }
              });
            })
          ),
        };
      }
    );

    return this.getChatHistoryQueryKey();
  }

  /** Удаляет сообщение из кеша по `message_id` через Immer. */
  async delete(messageId: UiMessage['message_id']) {
    await this.client.cancelQueries({
      queryKey: this.getChatHistoryQueryKey(),
    });

    this.client.setQueriesData<History>(
      { queryKey: this.getChatHistoryQueryKey() },
      (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map((page) =>
            produce(page, (draftPage) => {
              for (let index = draftPage.data.items.length - 1; index >= 0; index -= 1) {
                if (draftPage.data.items[index].message_id === messageId) {
                  draftPage.data.items.splice(index, 1);
                }
              }
            })
          ),
        };
      }
    );

    return this.getChatHistoryQueryKey();
  }
}

export type MessageHistoryQueryKey = ReturnType<
  MessageCacheDescriptor['getChatHistoryQueryKey']
>;
export type MessageListQueryKey = ReturnType<
  MessageCacheDescriptor['getChatListQueryKey']
>;
