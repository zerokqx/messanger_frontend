import type { InfiniteData } from '@tanstack/react-query';

interface PageWithItems {
  data: {
    items: unknown[];
  };
}

export const pagesMap = <TPage extends PageWithItems>(
  pages: InfiniteData<TPage> | undefined
): TPage['data']['items'][number][] =>
  pages?.pages.flatMap((page) => page.data.items) ?? [];
