import { lazy, Suspense, useMemo } from 'react';
import { Alert, Stack } from '@mantine/core';
import { CircleSlash } from 'lucide-react';
import { useChatUserId, useEnsureChat } from '@/entities/chat';
import { ChatInput } from './chat-input.tsx';
import { useMe } from '@/entities/user/model/me.query.ts';
import { urlAvatar, useGetUserById } from '@/entities/user/index.ts';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';
import { ChatSessionContext } from '../model/chat-session-context.ts';
import { ChatHeader } from './chat-header.tsx';
import { ErrorBoundary } from 'react-error-boundary';

const ChatHistoryViewer = lazy(() =>
  import('./chat-history-viewer.tsx').then((m) => ({
    default: m.ChatHistoryViewer,
  }))
);

export interface ChatWidgetProps {
  onToggleAside?: () => void;
  asideStatus?: boolean;
}

export const ChatWidget = (_props: ChatWidgetProps) => {
  const { userId } = useChatUserId();
  const { data: user } = useGetUserById({ id: userId });
  const { data: me } = useMe();
  const chatId = useEnsureChat(userId);

  const currentUser = useMemo(
    () => ({
      user_id: me.user_id,
      login: me.login,
      avatars: {
        current: {
          url: urlAvatar(me.user_id, me.avatars?.current?.file_id),
        },
      },
    }),
    [me.avatars, me.login, me.user_id]
  );

  const targetUser = useMemo(
    () =>
      user
        ? {
            user_id: user.user_id,
            login: user.login,
            custom_name: user.custom_name,
            avatars: {
              current: {
                url: urlAvatar(user.user_id, user.avatars?.current?.file_id),
              },
            },
            formatLogin: formatLogin(user.login, user.custom_name),
          }
        : null,
    [user]
  );

  const sessionValue = useMemo(
    () =>
      targetUser
        ? {
            chatId,
            currentUser,
            targetUser,
          }
        : null,
    [chatId, currentUser, targetUser]
  );

  if (!sessionValue) return;

  return (
    // eslint-disable-next-line react-x/no-context-provider
    <ChatSessionContext.Provider value={sessionValue}>
      <Stack h="100%" mih={0} gap={0}>
        <ChatHeader />
        {chatId ? (
          <Suspense>
            <ErrorBoundary fallback={<Alert>Error load chat</Alert>}>
              <ChatHistoryViewer />
              <ChatInput />
            </ErrorBoundary>
          </Suspense>
        ) : (
          <Alert icon={<CircleSlash size={16} />}>Chat is not selected</Alert>
        )}
      </Stack>
    </ChatSessionContext.Provider>
  );
};
