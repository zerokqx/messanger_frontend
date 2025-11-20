import { useContactsList } from '@/features/contactsList';
import { SideBarTaber } from '../../model/tab';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useContactCount } from '@/features/contactCount';
import { Box, ScrollArea } from '@mantine/core';
export const ContactsTab = () => {
  const parentRef = useRef(null);
  // const { data: count } = useContactCount();
  const virtualizer = useVirtualizer({
    // count: count ?? 0,
    count: 30,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  // const contacts = useContactsList(10, 1);

  return (
    <>
      <SideBarTaber.Panel value="contacts">
        <ScrollArea ref={parentRef}>
          <Box
            h={`${virtualizer.getTotalSize().toString()}px`}
            w="100%"
            pos={'relative'}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Row {virtualItem.index}
              </div>
            ))}
          </Box>
        </ScrollArea>
      </SideBarTaber.Panel>
    </>
  );
};
