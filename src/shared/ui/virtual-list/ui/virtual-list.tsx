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
  const { style: scrollContainerStyle, ...scrollContainerProps } =
    scrollAreaProps ?? {};
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
        range.endIndex >= data.length - 1
      ) {
        void fetchFunction();
      }
    },
    overscan,
  });

  const virtualRows = virtualizer.getVirtualItems();
  return (
    <div
      ref={viewportRef}
      style={{
        height: '100%',
        minHeight: 0,
        overflow: 'auto',
        ...scrollContainerStyle,
      }}
      {...scrollContainerProps}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize().toString()}px`,
          width: '100%',
          position: 'relative',
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
                height: `${virtualRow.size.toString()}px`,
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
    </div>
  );
};
