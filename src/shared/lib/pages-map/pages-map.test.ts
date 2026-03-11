import { describe, expect, it } from 'vitest';
import type { InfiniteData } from '@tanstack/react-query';
import { pagesMap } from './pages-map.ts';

interface TestItem {
  id: number;
  name: string;
}

interface TestPage {
  data: {
    items: TestItem[];
  };
}

describe('pagesMap', () => {
  it('returns empty array if pages is undefined', () => {
    const result = pagesMap<TestPage>(undefined);

    expect(result).toEqual([]);
  });

  it('returns empty array if pages.pages is empty', () => {
    const pages = {
      pages: [],
      pageParams: [],
    } as InfiniteData<TestPage>;

    const result = pagesMap(pages);

    expect(result).toEqual([]);
  });

  it('flattens items from all pages into one array', () => {
    const pages = {
      pages: [
        {
          data: {
            items: [
              { id: 1, name: 'one' },
              { id: 2, name: 'two' },
            ],
          },
        },
        {
          data: {
            items: [
              { id: 3, name: 'three' },
              { id: 4, name: 'four' },
            ],
          },
        },
      ],
      pageParams: [],
    } as InfiniteData<TestPage>;

    const result = pagesMap(pages);

    expect(result).toEqual([
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'three' },
      { id: 4, name: 'four' },
    ]);
  });

  it('returns items from a single page', () => {
    const pages = {
      pages: [
        {
          data: {
            items: [{ id: 1, name: 'only' }],
          },
        },
      ],
      pageParams: [],
    } as InfiniteData<TestPage>;

    const result = pagesMap(pages);

    expect(result).toEqual([{ id: 1, name: 'only' }]);
  });

  it('skips empty items arrays and merges the rest', () => {
    const pages = {
      pages: [
        {
          data: {
            items: [],
          },
        },
        {
          data: {
            items: [{ id: 2, name: 'two' }],
          },
        },
        {
          data: {
            items: [],
          },
        },
      ],
      pageParams: [],
    } as InfiniteData<TestPage>;

    const result = pagesMap(pages);

    expect(result).toEqual([{ id: 2, name: 'two' }]);
  });
});
