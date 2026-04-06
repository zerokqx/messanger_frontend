import { clsx } from 'clsx';
import { Box, type BoxProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { MessageVariant } from '../model';
import styles from './message-layout.module.css';

interface AvatarSlotProps {
  className: string;
}

/**
 * Раскладывает строку сообщения и пробрасывает её состояние через
 * `data-*` атрибуты корня, чтобы позиционирование оставалось в CSS.
 */
export interface MessageLayoutProps extends BoxProps {
  children?: ReactNode;
  avatar?: {
    component?: (props: AvatarSlotProps) => ReactNode;
    visible?: boolean;
  };
  chatId?: string;
  messageId?: number;
  isMe?: boolean;
  nextSameAuthor?: boolean;
  variant?: MessageVariant;
  className?: string;
  contentClassName?: string;
  avatarClassName?: string;
}

/** Корневой layout-контейнер для строки сообщения. */
export const MessageLayout = ({
  avatar,
  children,
  className = 'message',
  contentClassName = 'messageContent',
  avatarClassName = 'messageAvatar',
  chatId,
  messageId,
  isMe = false,
  nextSameAuthor = false,
  variant = 'text',
  ...props
}: MessageLayoutProps) => {
  return (
    <Box
      className={clsx(styles.messageLayout, className)}
      data-chat-id={chatId}
      data-message-id={messageId}
      data-is-me={String(isMe)}
      data-next-same-author={String(nextSameAuthor)}
      data-variant={variant}
      {...props}
    >
      {avatar?.component && avatar.visible ? (
        <Box className={clsx(styles.avatarSlot, avatarClassName)}>
          {avatar.component({ className: avatarClassName })}
        </Box>
      ) : null}
      <Box className={clsx(styles.contentSlot, contentClassName)}>
        {children}
      </Box>
    </Box>
  );
};
