import { RoundedContainerGroup } from '@/shared/ui/boxes';
import type { MessageTextProps } from './types';
import { Avatar, Group, Text } from '@mantine/core';
import { useSettingsStore } from '@/shared/lib/settings';

export const MessageText = ({
  avatarSrc,
  message,
  userIdOfCurrentUser,
  avatarName,
}: MessageTextProps) => {
  const primary = useSettingsStore((s) => s.data.primaryColor);
  const isMe = userIdOfCurrentUser === message.sender_id;
  return (
    <Group maw={'30rem'} wrap="nowrap" align="flex-end">
      <Avatar name={avatarName} src={avatarSrc} />
      <RoundedContainerGroup bg={isMe ? primary : undefined}>
        <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.content}
        </Text>
      </RoundedContainerGroup>
    </Group>
  );
};
