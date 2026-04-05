import { RoundedContainerGroup } from '@/shared/ui/boxes';
import classes from './message-text-type.module.css';
import type { MessageTextProps } from './types';
import {
  Avatar,
  getContrastColor,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useSettingsStore } from '@/shared/lib/settings';
import { lightDark } from '@/shared/lib/light-dark';

export const MessageText = ({
  avatarSrc,
  message,
  userIdOfCurrentUser,
  avatarName,
}: MessageTextProps) => {
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

<<<<<<< Updated upstream
||||||| Stash base
  const nextMessage = nextUserIdOfMessage === message.sender_id;

  const formatedTime = new Date(message.created_at).toLocaleTimeString(
    'ru-RU',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  );
=======
  const nextMessage = nextUserIdOfMessage === message.sender_id;

  const formatedTime = new Date(message.created_at).toLocaleTimeString(
    'ru-RU',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  );
  
>>>>>>> Stashed changes
  return (
    <Group
      className={classes.messageRow}
      data-side={isMe ? 'me' : 'peer'}
      w={'100%'}
      wrap="nowrap"
<<<<<<< Updated upstream
      align='end'
      justify={desktop ? 'start' : 'flex-start'}
      style={{
        flexDirection: isMe ? (desktop ? 'row' : 'row-reverse') : 'row',
        gap: '12px',
      }}
||||||| Stash base
      align="end"
      style={{
        flexDirection: isMe ? (desktop ? 'row' : 'row-reverse') : 'row',
        gap: '12px',
      }}
=======
      align="end"
      gap="sm"
>>>>>>> Stashed changes
    >
<<<<<<< Updated upstream
      {!mobile && <Avatar name={avatarName} src={avatarSrc} />}
      <RoundedContainerGroup bg={bgColor} c={textColor} bd={'none'}>
||||||| Stash base
      {!mobile && (
        <Avatar
          opacity={nextMessage ? 0 : undefined}
          name={avatarName}
          src={!nextMessage ? avatarSrc : undefined}
        />
      )}
      <RoundedContainerGroup
        bg={bgColor}
        c={textColor}
        gap={'md'}
        wrap="nowrap"
        align="end"
        bd={'none'}
      >
=======

      {message.__state?.isError && (
      <p>ERROR</p>
      )}
      <Avatar
        className={classes.avatar}
        opacity={nextMessage ? 0 : undefined}
        name={avatarName}
        src={!nextMessage ? avatarSrc : undefined}
      />
      <RoundedContainerGroup
        bg={bgColor}
        c={textColor}
        gap={'md'}
        wrap="nowrap"
        align="end"
        bd={'none'}
      >
>>>>>>> Stashed changes
        <Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.content}
        </Text>
      </RoundedContainerGroup>
    </Group>
  );
};
