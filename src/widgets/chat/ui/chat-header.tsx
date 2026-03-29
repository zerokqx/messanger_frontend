import { useChatUserId, useSelectedChat } from '@/entities/chat';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import { ActionIcon, Avatar, Title, Center } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useChatSession } from '../model/chat-session-context';
import { AnimatePresence, m } from 'motion/react';

export const ChatHeader = () => {
  const { avatars, formatLogin } = useChatSession((state) => state.targetUser);

  const setChatId = useSelectedChat((s) => s.set);
  const { setUserId } = useChatUserId();
  return (
      <RoundedContainerGroup
        bdrs={0}
        wrap="nowrap"
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
        <Center
          w={'100%'}
          styles={(t) => ({
            root: {
              gap: t.spacing.xs,
              cursor: 'pointer',
            },
          })}
          onClick={() => {
            layoutAction.doSetAside(true);
          }}
        >
          <Avatar src={avatars.current.url} name={formatLogin.name} />
          <Title size={'md'}>{formatLogin.name}</Title>
        </Center>
      </RoundedContainerGroup>
  );
};
