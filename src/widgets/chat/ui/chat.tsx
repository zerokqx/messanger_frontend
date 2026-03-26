import { lazy, Suspense, useState } from 'react';
import { ActionIcon, Alert, Box, Stack } from '@mantine/core';
import { ArrowLeft, CircleSlash, PanelLeft } from 'lucide-react';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { useSendMessage } from '@/features/chat';
import { useChatUserId, useEnsureChat } from '@/entities/chat/index.ts';
import { ChatInput } from './chat-input.tsx';
import { useMe } from '@/entities/user/model/me.query.ts';
import { urlAvatar, useGetUserById } from '@/entities/user/index.ts';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';

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
  const { userId, setUserId } = useChatUserId();
  const { data: user } = useGetUserById({ id: userId });
  const { data: me } = useMe();
  const chatId = useEnsureChat(userId);
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
    setInp('');
  };

  const currentUser = {
    userId: me?.user_id,
    avatarName: me?.login,
    avatarSrc: urlAvatar(me?.user_id, me?.avatars?.current?.file_id),
  };

  const interlocutor = {
    userId: user?.user_id,
    avatarName: formatLogin(user?.login, user?.custom_name),
    avatarSrc: urlAvatar(user?.user_id, user?.avatars?.current?.file_id),
  };

  return (
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
          }}
        >
          <ArrowLeft />
        </ActionIcon>
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
          <ChatHistoryViewer
            chatId={chatId}
            currentUser={currentUser}
            interlocutor={interlocutor}
          />
        </Suspense>
      ) : (
        <Alert icon={<CircleSlash size={16} />}>Chat is not selected</Alert>
      )}

      <Box p="xs">
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
  );
};
