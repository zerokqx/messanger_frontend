import { Virtuoso } from 'react-virtuoso';
import { MessageItem } from './message-item';
import { SystemMessage } from './system-message';
import type { MessageContainerProps } from './types';

export const ChatContainer = ({
  items,
  style,
  increaseViewportBy = 280,
}: MessageContainerProps) => {
  return (
    <Virtuoso
      style={{
        height: '100%',
        minHeight: 0,
        ...style,
      }}
      totalCount={items.length}
      increaseViewportBy={increaseViewportBy}
      itemContent={(index) => {
        const item = items[index];

        if (item.message.message_type.includes('system')) {
          return <SystemMessage message={item.message} />;
        }

        return <MessageItem {...item} />;
      }}
    />
  );
};
