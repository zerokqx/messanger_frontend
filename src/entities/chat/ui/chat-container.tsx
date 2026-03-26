import { Virtuoso } from 'react-virtuoso';
import { MessageText } from './message-text-type';
import { SystemMessage } from './system-message';
import type { MessageContainerProps } from './types';
import {  Stack } from '@mantine/core';

const StackList = (props: object) => <Stack {...props} gap={'lg'} />;
export const ChatContainer = ({
  messages,
  style,
  increaseViewportBy = 280,
  initialTopMostItemIndex,
  startReached,
  followOutput,
  computeItemKey,
}: MessageContainerProps) => {
  return (
    <Virtuoso
      data={messages}
      useWindowScroll
      initialTopMostItemIndex={initialTopMostItemIndex}
      startReached={startReached}
      followOutput={followOutput}
      computeItemKey={computeItemKey}
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
        console.log(item,'ITEM');
        if (item.message_type.includes('system')) {
          return <SystemMessage message={item} />;
        }
        return <MessageText avatarSrc="dwd" content={item.content} />;
      }}
    />
  );
};
