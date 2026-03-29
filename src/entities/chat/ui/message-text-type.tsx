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

export const MessageText = ({
  avatarSrc,
  message,
  userIdOfCurrentUser,
  avatarName,
}: MessageTextProps) => {
  const { mobile, desktop } = useResponsive();
  const theme = useMantineTheme();
  const primary = useSettingsStore((s) => s.data.primaryColor);

  const isMe = userIdOfCurrentUser === message.sender_id;

  const bgColor = isMe
    ? theme.colors[primary][6]
    : lightDark('dark.9', 'dark.8');

  const textColor = getContrastColor({
    theme,
    color: bgColor,
    autoContrast: true,
  });

  return (
    <Group
      w={'100%'}
      wrap="nowrap"
      align='end'
      justify={desktop ? 'start' : 'flex-start'}
      style={{
        flexDirection: isMe ? (desktop ? 'row' : 'row-reverse') : 'row',
        gap: '12px',
      }}
    >
      {!mobile && <Avatar name={avatarName} src={avatarSrc} />}
      <RoundedContainerGroup bg={bgColor} c={textColor} bd={'none'}>
        <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.content}
        </Text>
      </RoundedContainerGroup>
    </Group>
  );
};
