import { useChatUserId, useSelectedChat } from '@/entities/chat';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { ActionIcon, Group, Avatar, Title } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useChatSession } from '../model/chat-session-context';

export const ChatHeader = () => {
  const { avatars, formatLogin } = useChatSession((state) => state.targetUser);

  console.log(avatars,"ADW");
  
  const setChatId = useSelectedChat((s) => s.set);
  const { setUserId } = useChatUserId();
  return (
    <RoundedContainerGroup
      bdrs={0}
      justify="space-between"
      style={{ zIndex: 100 }}
      w="100%"
    >
      <ActionIcon
        onClick={async () => {
          await setUserId('');
          setChatId('');
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
        <Avatar src={avatars.current.url} name={formatLogin.name} />
        <Title size={'md'}>{formatLogin.name}</Title>
      </Group>
    </RoundedContainerGroup>
  );
};
