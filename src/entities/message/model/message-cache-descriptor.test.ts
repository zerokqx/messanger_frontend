import { QueryClient } from '@tanstack/react-query';
import { describe, expect, test } from 'vitest';
import type { OptimisticHistoryResponse, UiMessage } from './types';
import { MessageCacheDescriptor } from './message-cache-descriptor';

const createMessage = (overrides: Partial<UiMessage> = {}): UiMessage => ({
  message_id: 1,
  message_type: ['text'],
  forward_metadata: null,
  chat_id: 'chat-1',
  sender_id: 'user-1',
  sender_data: null,
  content: 'hello',
  media_link: null,
  is_viewed: false,
  viewed_at: null,
  created_at: '2026-03-11T12:34:00.000Z',
  updated_at: null,
  is_edited: false,
  ...overrides,
});

const createHistory = (items: UiMessage[]): {
  pageParams: [null];
  pages: [OptimisticHistoryResponse];
} => ({
  pageParams: [null],
  pages: [
    {
      status: 'ok',
      data: {
        has_more: false,
        items,
      },
    },
  ],
});

describe('MessageCacheDescriptor', () => {
  test('returns orval-based query keys', () => {
    const descriptor = MessageCacheDescriptor.getInstance(
      'chat-1',
      new QueryClient()
    );

    expect(descriptor.getChatListQueryKey()).toEqual(
      expect.arrayContaining(['/v1/chat/private/list'])
    );
    expect(descriptor.getChatHistoryQueryKey()).toEqual(
      expect.arrayContaining(['/v1/chat/private/history'])
    );
  });

  test('generates numeric optimistic message ids', () => {
    const descriptor = MessageCacheDescriptor.getInstance(
      'chat-1',
      new QueryClient()
    );

    expect(Number.isInteger(descriptor.generateMessageId())).toBe(true);
  });

  test('creates a message in the first history page', async () => {
    const client = new QueryClient();
    const descriptor = MessageCacheDescriptor.getInstance('chat-1', client);
    const historyKey = descriptor.getChatHistoryQueryKey();
    const message = createMessage();

    client.setQueryData(historyKey, createHistory([]));

    await descriptor.create(message);

    const history = client.getQueryData<ReturnType<typeof createHistory>>(historyKey);
    expect(history?.pages[0].data.items[0]).toEqual(message);
  });

  test('updates a cached message by message_id', async () => {
    const client = new QueryClient();
    const descriptor = MessageCacheDescriptor.getInstance('chat-1', client);
    const historyKey = descriptor.getChatHistoryQueryKey();

    client.setQueryData(historyKey, createHistory([createMessage()]));

    await descriptor.update(1, (draft) => {
      draft.content = 'updated';
      draft.isOptimistic = false;
    });

    const history = client.getQueryData<ReturnType<typeof createHistory>>(historyKey);
    expect(history?.pages[0].data.items[0].content).toBe('updated');
    expect(history?.pages[0].data.items[0].isOptimistic).toBe(false);
  });

  test('deletes a cached message by message_id', async () => {
    const client = new QueryClient();
    const descriptor = MessageCacheDescriptor.getInstance('chat-1', client);
    const historyKey = descriptor.getChatHistoryQueryKey();

    client.setQueryData(
      historyKey,
      createHistory([createMessage(), createMessage({ message_id: 2 })])
    );

    await descriptor.delete(1);

    const history = client.getQueryData<ReturnType<typeof createHistory>>(historyKey);
    expect(history?.pages[0].data.items).toHaveLength(1);
    expect(history?.pages[0].data.items[0].message_id).toBe(2);
  });

  test('returns the same instance for the same chat and query client', () => {
    const client = new QueryClient();
    const first = MessageCacheDescriptor.getInstance('chat-1', client);
    const second = MessageCacheDescriptor.getInstance('chat-1', client);

    expect(first).toBe(second);
  });
});
