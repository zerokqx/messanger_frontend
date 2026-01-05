import type { TabsConfig } from '@/shared/ui/Tabs';
import { Center, Loader } from '@mantine/core';
import { lazy } from 'react';

export const asideTabsConfig: TabsConfig<true>[] = [
  {
    render: lazy(() =>
      import('../ui/tabs/Search.tab').then((m) => ({ default: m.SearchTab }))
    ),
    fallback: (
      <Center>
        <Loader />
      </Center>
    ),
  },
];
