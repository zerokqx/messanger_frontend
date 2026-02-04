import type { TabsConfig } from '@/shared/ui/tabs';
import { Center, Loader } from '@mantine/core';
import { lazy } from 'react';

export const asideTabsConfig: TabsConfig<true>[] = [
  {
    render: lazy(() =>
      import('../ui/tabs/search.tab').then((m) => ({ default: m.SearchTab }))
    ),
    fallback: (
      <Center>
        <Loader />
      </Center>
    ),
  },
];
