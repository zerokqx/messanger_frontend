import {
  getContrastColor,
  Group,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { CheckCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useSettingsStore } from '@/shared/lib/settings';
import { lightDark } from '@/shared/lib/light-dark';
import { RoundedContainerGroup } from '@/shared/ui/boxes';
import type { MessageTextProps } from './types';
import styles from './message-text.module.css';

/**
 * Рендерит текстовый пузырь одного сообщения.
 * Позиционирование и аватар остаются в `MessageLayout`.
 */
export const MessageText = ({
  message,
  userIdOfCurrentUser,
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
  const formattedTime = useMemo(
    () =>
      new Date(message.created_at).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    [message.created_at]
  );

  return (
    <RoundedContainerGroup
      className={styles.messageBubble}
      bg={bgColor}
      c={textColor}
      gap="md"
      wrap="nowrap"
      align="end"
      bd="none"
    >
      <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {message.content}
      </Text>
      <Group align="end" gap="xs" wrap="nowrap">
        <Text size="xs" opacity={0.6}>
          {formattedTime}
        </Text>
        {message.is_viewed ? (
          <ThemeIcon color="white" opacity={0.6} size="xs">
            <CheckCheck />
          </ThemeIcon>
        ) : null}
      </Group>
    </RoundedContainerGroup>
  );
};
