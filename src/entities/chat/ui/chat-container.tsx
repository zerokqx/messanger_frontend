import { Virtuoso } from 'react-virtuoso';
import { MessageItem } from './message-item';
import { SystemMessage } from './system-message';
import type { MessageContainerProps } from './types';
import { Box, Stack } from '@mantine/core';

const StackList = (props: object) => <Stack {...props} gap={'lg'} />;
export const ChatContainer = ({
  messages,
  style,
  increaseViewportBy = 280,
}: MessageContainerProps) => {
  return (
    <Virtuoso
      data={messages}
      useWindowScroll
      components={{
        List: StackList,
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
        return <MessageItem message={item} />;
      }}
    />
  );
};
