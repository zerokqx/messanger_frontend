import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import {
  ActionIcon,
  Alert,
  Avatar,
  Box,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { ArrowLeft, CircleSlash, PanelLeft } from 'lucide-react';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { useSendMessage } from '@/features/chat';
import { useChatUserId, useEnsureChat, useSelectedChat } from '@/entities/chat';
import { ChatInput } from './chat-input.tsx';
import { useMe } from '@/entities/user/model/me.query.ts';
import { urlAvatar, useGetUserById } from '@/entities/user/index.ts';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';
import { layoutAction } from '@/shared/lib/hooks/use-layout/index.ts';
import { ChatSessionContext } from '../model/chat-session-context.ts';

const ChatHistoryViewer = lazy(() =>
  import('./chat-history-viewer.tsx').then((m) => ({
    default: m.ChatHistoryViewer,
  }))
);

export interface ChatWidgetProps {
  onToggleAside?: () => void;
  asideStatus?: boolean;
}

export const ChatWidget = ({ onToggleAside, asideStatus }: ChatWidgetProps) => {
  const inputBox = useRef<HTMLDivElement | null>(null);
  const { userId, setUserId } = useChatUserId();
  const { data: user } = useGetUserById({ id: userId });
  const { data: me } = useMe();
  const chatId = useEnsureChat(userId);
  const resetSelectedChat = useSelectedChat((s) => s.set);
  const { mutateAsync: sendMessage, isPending } = useSendMessage();
  const [inp, setInp] = useState('');

  const handleSendMessage = async () => {
    if (!chatId || inp.trim().length === 0) return;

    await sendMessage({
      data: {
        chat_id: chatId,
        message_type: ['text'],
        content: inp,
      },
    });
    inputBox.current?.scrollTo();
    setInp('');
  };

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
      <Stack h="100%" align="center" mih={0} gap={0}>
        <RoundedContainerGroup
          bdrs={0}
          justify="space-between"
          style={{ zIndex: 100 }}
          w="100%"
        >
          <ActionIcon
            onClick={async () => {
              await setUserId('');
              resetSelectedChat('');
            }}
          >
            <ArrowLeft />
          </ActionIcon>
          <Group
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              layoutAction.doSetAside(true);
            }}
          >
            <Avatar
              src={targetUser?.avatars.current.url}
              name={targetUser?.formatLogin.name}
            />
            <Title size={'md'}>{targetUser?.formatLogin.name}</Title>
          </Group>
          {onToggleAside && (
            <ActionIcon
              onClick={onToggleAside}
              variant={asideStatus ? 'light' : 'subtle'}
            >
              <PanelLeft />
            </ActionIcon>
          )}
        </RoundedContainerGroup>
        {chatId ? (
          <Suspense>
            <ChatHistoryViewer />
          </Suspense>
        ) : (
          <Alert icon={<CircleSlash size={16} />}>Chat is not selected</Alert>
        )}

        <Box p="xs" ref={inputBox}>
          <ChatInput
            value={inp}
            onChange={setInp}
            onSubmit={handleSendMessage}
            disabled={!chatId}
            isPending={isPending}
            placeholder={
              chatId
                ? 'Напишите сообщение...'
                : 'Выберите чат, чтобы начать переписку'
            }
          />
        </Box>
      </Stack>
    </ChatSessionContext.Provider>
  );
};
