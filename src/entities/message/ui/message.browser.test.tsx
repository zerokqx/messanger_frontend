import { Box, MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  MessageLayout,
  MessageList,
  MessageText,
  SystemMessage,
  type UiMessage,
} from '@/entities/message';

const createMessage = (overrides: Partial<UiMessage> = {}): UiMessage => ({
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
  is_edited: false,
  ...overrides,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

test('MessageText renders message content', async () => {
  const { getByText } = await render(
    <MessageText
      message={createMessage()}
      userIdOfCurrentUser="00000000-0000-0000-0000-000000000099"
    />,
    { wrapper }
  );

  await expect.element(getByText('Hello from browser test')).toBeVisible();
});

test('SystemMessage renders content', async () => {
  const { getByText } = await render(
    <SystemMessage
      message={createMessage({
        message_id: 2,
        message_type: ['system'],
        content: 'System maintenance',
      })}
    />,
    { wrapper }
  );

  await expect.element(getByText('System maintenance')).toBeVisible();
});

test('MessageLayout exposes message data attributes', async () => {
  await render(
    <MessageLayout
      chatId="chat-1"
      messageId={7}
      isMe
      nextSameAuthor
      variant="text"
    >
      <Box>layout child</Box>
    </MessageLayout>,
    { wrapper }
  );

  const root = document.querySelector('[data-message-id="7"]');
  expect(root).not.toBeNull();
  expect(root?.getAttribute('data-chat-id')).toBe('chat-1');
  expect(root?.getAttribute('data-is-me')).toBe('true');
  expect(root?.getAttribute('data-next-same-author')).toBe('true');
});

test('MessageList renders regular and system messages', async () => {
  const { getByText } = await render(
    <div style={{ height: 240 }}>
      <MessageList
        currentUserId="00000000-0000-0000-0000-000000000099"
        messages={[
          createMessage({ message_id: 11, content: 'First chat message' }),
          createMessage({
            message_id: 12,
            message_type: ['system'],
            content: 'Joined chat',
          }),
        ]}
      />
    </div>,
    { wrapper }
  );

  await expect.element(getByText('First chat message')).toBeVisible();
  await expect.element(getByText('Joined chat')).toBeVisible();
});
