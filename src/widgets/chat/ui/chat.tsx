import { Chat, useChatHistory } from '@/entities/chat';
import { useSelectedChat } from '@/features/chat';
import { pagesMap } from '@/shared/lib/pages-map';
import { Button, Input, Stack } from '@mantine/core';
import { useHash } from '@mantine/hooks';

export const ChatWidget = () => {
  const selectedChat = useSelectedChat((s) => s.data);
  const { data: historyChat } = useChatHistory(selectedChat);
  const historyChatMap = pagesMap(historyChat);

  return (
    <Stack>
      <Chat messages={historyChatMap} />
      <Input />
    </Stack>
  );
};
