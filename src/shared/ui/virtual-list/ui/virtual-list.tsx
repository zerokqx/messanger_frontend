import { ScrollArea } from '@mantine/core';
import type { VirtualListProp } from '../types/virtual-list.type';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export const VirtualList = <D extends any[]>({
  hasNextPage,
  isFetchingNextPage,
  count = 0,
  data,
  overscan,
  render,
  fallback,
  dataSelect,
  fetchFunction,
  esimateSize,
  scrollAreaProps,
}: VirtualListProp<D>) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => viewportRef.current,
    estimateSize: esimateSize,
    onChange: ({ range }) => {
      if (
        range &&
        hasNextPage &&
        !isFetchingNextPage &&
        range.endIndex >= data.length - 1 // или -3, если хотите раньше
      ) {
        void fetchFunction();
      }
    },
    overscan,
  });

  const virtualRows = virtualizer.getVirtualItems();
  return (
    <ScrollArea
      offsetScrollbars="y"
      viewportRef={viewportRef}
      {...scrollAreaProps}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const contact = dataSelect(data, virtualRow.index);
          const isSkeleton = virtualRow.index >= data.length;
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start.toString()}px)`,
                display: 'flex',
                alignItems: 'center',
                paddingInline: 8,
                boxSizing: 'border-box',
              }}
            >
              {isSkeleton
                ? hasNextPage && fallback?.(virtualRow.size)
                : contact && render(contact)}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
