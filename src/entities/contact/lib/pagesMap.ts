import type { components } from '@/shared/types/v1';
import type { InfiniteData } from '@tanstack/react-query';

export const pagesMap = (
  pages:
    | InfiniteData<{
        status: string;
        data: components['schemas']['ContactInfoData'];
      }>
    | undefined
) => pages?.pages.flatMap((page) => page.data.items) ?? [];
