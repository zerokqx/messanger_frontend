import { useChatUserId, useSelectedChat } from '@/entities/chat';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { RoundedContainerGrid } from '@/shared/ui/boxes';
import {
  ActionIcon,
  Avatar,
  Title,
  GridCol,
  Center,
} from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useChatSession } from '../model/chat-session-context';

export const ChatHeader = () => {
  const { avatars, formatLogin } = useChatSession((state) => state.targetUser);

  console.log(avatars, 'ADW');

  const setChatId = useSelectedChat((s) => s.set);
  const { setUserId } = useChatUserId();
  return (
    <RoundedContainerGrid
      bdrs={0}
      justify="space-between"
      style={{ zIndex: 100 }}
      w="100%"
    >
      <GridCol span={'content'}>
        <ActionIcon
          onClick={async () => {
            await setUserId('');
            setChatId('');
          }}
        >
          <ArrowLeft />
        </ActionIcon>
      </GridCol>
      <GridCol span={'auto'}>
        <Center
          styles={(t) => ({
            root: {
              gap: t.spacing.xs,
              cursor:'pointer'
            },
          })}
          onClick={() => {
            layoutAction.doSetAside(true);
          }}
        >
          <Avatar src={avatars.current.url} name={formatLogin.name} />
          <Title size={'md'}>{formatLogin.name}</Title>
        </Center>
      </GridCol>
    </RoundedContainerGrid>
  );
};
