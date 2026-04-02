import { RoundedContainerGroup } from '@/shared/ui/boxes';
import type { MessageTextProps } from './types';
import {
  Avatar,
  getContrastColor,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useSettingsStore } from '@/shared/lib/settings';
import { useResponsive } from '@/shared/lib/hooks/use-responsive';
import { lightDark } from '@/shared/lib/light-dark';
import { CheckCheck } from 'lucide-react';

export const MessageText = ({
  avatarSrc,
  message,
  nextUserIdOfMessage,
  userIdOfCurrentUser,
  avatarName,
}: MessageTextProps) => {
  const { mobile, desktop } = useResponsive();
  const theme = useMantineTheme();
  const primary = useSettingsStore((s) => s.data.primaryColor);

  const isMe = userIdOfCurrentUser === message.sender_id;

  const bgColor = isMe
    ? theme.colors[primary][6]
    : lightDark('dark.5', 'dark.8');

  const textColor = getContrastColor({
    theme,
    color: bgColor,
    autoContrast: true,
  });

  const nextMessage = nextUserIdOfMessage === message.sender_id;

  return (
    <Group
      w={'100%'}
      wrap="nowrap"
      align="end"
      style={{
        flexDirection: isMe ? (desktop ? 'row' : 'row-reverse') : 'row',
        gap: '12px',
      }}
    >
      {!mobile && (
        <Avatar
          opacity={nextMessage ? 0 : undefined}
          name={avatarName}
          src={!nextMessage ? avatarSrc : undefined}
        />
      )}
      <RoundedContainerGroup bg={bgColor} c={textColor} bd={'none'}>
        <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.content}
        </Text>
        {/* {message.is_viewed && <CheckCheck />} */}
      </RoundedContainerGroup>
    </Group>
  );
};
