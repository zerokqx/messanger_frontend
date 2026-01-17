import { Suspense } from 'react';
import { SideBar } from '@/shared/ui/SideBar';
import { Header } from './Header';
import { SideBarTaber } from '../model/tab';
import { Box, Center, Loader } from '@mantine/core';
import { map } from 'lodash';
import { sidebarTabsConfig } from '../config/sidebar.config';

export const SideBarWidget = () => {
  return (
    <SideBar>
      <Header />
      <SideBarTaber>
        {map(sidebarTabsConfig, (component, i) => (
          <Suspense fallback={null}>
            <Box key={i}>
              <component.render />
            </Box>
          </Suspense>
        ))}
      </SideBarTaber>
    </SideBar>
  );
};
