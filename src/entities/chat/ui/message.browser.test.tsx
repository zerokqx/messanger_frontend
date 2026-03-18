import { MantineProvider } from '@mantine/core';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Chat } from '@/entities/chat';
import type { ChatMessage } from './types';

const createMessage = (
  overrides: Partial<ChatMessage> = {}
): ChatMessage => ({
  message_id: 1,
  message_type: ['text'],
  forward_metadata: null,
  chat_id: '00000000-0000-0000-0000-000000000001',
  sender_id: '00000000-0000-0000-0000-000000000010',
  sender_data: null,
  content: 'Hello from browser test',
  media_link: null,
  is_viewed: true,
  viewed_at: null,
  created_at: '2026-03-11T12:34:00.000Z',
  updated_at: null,
  ...overrides,
});

test('Chat.Message renders sender and text', async () => {
  const { getByText } = await render(
    <Chat.Message message={createMessage()} senderName="Alice" avatarLabel="AL" />,
    { wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider> }
  );

  await expect.element(getByText('Alice')).toBeInTheDocument();
  await expect.element(getByText('Hello from browser test')).toBeVisible();
});

test('Chat.SystemMessage renders content', async () => {
  const { getByText } = await render(
    <Chat.SystemMessage
      message={createMessage({
        message_id: 2,
        message_type: ['system'],
        content: 'System maintenance',
      })}
    />,
    { wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider> }
  );

  await expect.element(getByText('System maintenance')).toBeVisible();
});

test('Chat container renders virtuoso items', async () => {
  const items = [
    createMessage({ message_id: 11, content: 'First chat message' }),
    createMessage({
      message_id: 12,
      message_type: ['system'],
      content: 'Joined chat',
    }),
  ];

  const { getByText } = await render(
    <div style={{ height: 240 }}>
      <Chat messages={items} />
    </div>,
    { wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider> }
  );

  await expect.element(getByText('First chat message')).toBeVisible();
  await expect.element(getByText('Joined chat')).toBeVisible();
});
