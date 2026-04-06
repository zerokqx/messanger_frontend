import { RoundedContainerGroup } from '@/shared/ui/boxes';
import type { MessageTextProps } from './types';
import styles from './message-text-type.module.css';
import {
  Avatar,
  getContrastColor,
  Group,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useSettingsStore } from '@/shared/lib/settings';
import { lightDark } from '@/shared/lib/light-dark';
import { CheckCheck } from 'lucide-react';

export const MessageText = ({
  avatarSrc,
  message,
  nextUserIdOfMessage,
  userIdOfCurrentUser,
  avatarName,
}: MessageTextProps) => {
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

  const formatedTime = new Date(message.created_at).toLocaleTimeString(
    'ru-RU',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  );
  return (
    <Group
      className={styles.messageGroup}
      data-is-me={isMe ? 'true' : 'false'}
      data-next-same-author={nextMessage ? 'true' : 'false'}
      wrap="nowrap"
      align="end"
    >
      <Avatar
        className={styles.avatar}
        name={avatarName}
        src={!nextMessage ? avatarSrc : undefined}
      />
      <RoundedContainerGroup
        className={styles.messageBubble}
        bg={bgColor}
        c={textColor}
        gap={'md'}
        wrap="nowrap"
        align="end"
        bd={'none'}
      >
        <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.content}
        </Text>
        <Group align="end" gap={'xs'} wrap="nowrap">
          <Text size="xs" opacity={0.6}>
            {formatedTime}
          </Text>
          {message.is_viewed && (
            <ThemeIcon color="white" opacity={0.6} size={'xs'}>
              <CheckCheck />
            </ThemeIcon>
          )}
        </Group>
      </RoundedContainerGroup>
    </Group>
  );
};
