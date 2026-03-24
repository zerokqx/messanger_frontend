import { lazy, Suspense, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ActionIcon, Alert, Button, Group, Input, Stack } from '@mantine/core';
import { ArrowLeft, CircleSlash, PanelLeft } from 'lucide-react';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { useSendMessage } from '@/features/chat';
import { useGetChat } from '@/features/chat/model';

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
  const { chatId } = useGetChat();
  const { mutateAsync: sendMessage } = useSendMessage();
  const navigate = useNavigate();
  const [inp, setInp] = useState('');

  return (
    <Stack h="100%" mih={0} gap={0}>
      <RoundedContainerGroup
        bdrs={0}
        justify="space-between"
        style={{ zIndex: 100 }}
        w="100%"
      >
        <ActionIcon onClick={() => navigate({ hash: '' })}>
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
          <ChatHistoryViewer chatId={chatId} />
        </Suspense>
      ) : (
        <Alert icon={<CircleSlash size={16} />}>Chat is not selected</Alert>
      )}

      <Group w="100%" justify="center" p="xs">
        <Input
          value={inp}
          onChange={(e) => setInp(e.currentTarget.value)}
          w="30rem"
        />
        <Button
          disabled={!chatId}
          onClick={async () => {
            if (!chatId) return;
            await sendMessage({
              data: {
                chat_id: chatId,
                message_type: ['text'],
                content: inp,
              },
            });
            setInp('');
          }}
        >
          send
        </Button>
      </Group>
    </Stack>
  );
};
