import type { InfiniteData } from '@tanstack/react-query';
import { produce, type Draft } from 'immer';

type InsertPosition = 'start' | 'end';

export const infinityQueryOptimisticUpdate = <PageItem extends object, Item>(
  data: InfiniteData<PageItem>,
  getItems: (page: Draft<PageItem>) => Item[],
  predicate: (item: Item) => boolean,
  updateFn: (draft: Draft<Item>) => void
): InfiniteData<PageItem> => {
  return {
    ...data,
    pages: data.pages.map((page) =>
      produce(page, (draftPage) => {
        const items = getItems(draftPage);
        items.forEach((item) => {
          if (predicate(item)) {
            updateFn(item as Draft<Item>);
          }
        });
      })
    ),
  };
};

export const infinityQueryOptimisticInsert = <PageItem extends object, Item>(
  data: InfiniteData<PageItem>,
  getItems: (page: Draft<PageItem>) => Draft<Item>[],
  item: Item,
  insert: InsertPosition = 'start'
): InfiniteData<PageItem> => {
  return {
    ...data,
    pages: data.pages.map((page, index) =>
      index === 0
        ? produce(page, (draftPage) => {
            const items = getItems(draftPage);

            if (insert === 'end') {
              items.push(item as Draft<Item>);
              return;
            }

            items.unshift(item as Draft<Item>);
          })
        : page
    ),
  };
};

export const infinityQueryOptimisticRemove = <PageItem extends object, Item>(
  data: InfiniteData<PageItem>,
  getItems: (page: Draft<PageItem>) => Draft<Item>[],
  predicate: (item: Item) => boolean
): InfiniteData<PageItem> => {
  return {
    ...data,
    pages: data.pages.map((page) =>
      produce(page, (draftPage) => {
        const items = getItems(draftPage);
        for (let index = items.length - 1; index >= 0; index -= 1) {
          if (predicate(items[index] as Item)) {
            items.splice(index, 1);
          }
        }
      })
    ),
  };
};
