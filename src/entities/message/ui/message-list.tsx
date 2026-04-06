import { Stack } from '@mantine/core';
import type { ComponentProps } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { MessageText } from './message-text';
import { SystemMessage } from './system-message';
import type { MessageListProps } from './types';

const ListRoot = (props: ComponentProps<typeof Stack>) => (
  <Stack {...props} gap="lg" />
);

/** Простой виртуализированный список для экранов, где нужен только рендер сообщений. */
export const MessageList = ({
  messages,
  currentUserId = '',
  style,
  increaseViewportBy = 280,
  initialTopMostItemIndex,
  startReached,
  followOutput,
  computeItemKey,
}: MessageListProps) => {
  return (
    <Virtuoso
      data={messages}
      useWindowScroll
      initialTopMostItemIndex={initialTopMostItemIndex}
      startReached={startReached}
      followOutput={followOutput}
      computeItemKey={computeItemKey}
      components={{
        List: ListRoot,
      }}
      style={{
        minHeight: 0,
        ...style,
      }}
      totalCount={messages.length}
      increaseViewportBy={increaseViewportBy}
      itemContent={(_, item) => {
        if (item.message_type.includes('system')) {
          return <SystemMessage message={item} />;
        }

        return (
          <MessageText message={item} userIdOfCurrentUser={currentUserId} />
        );
      }}
    />
  );
};
