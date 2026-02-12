import { SideBar } from '@/shared/ui/side-bar';
import { Header } from './header';
import { SideBarTaber } from '../model/tab';
import { Box, Center, Loader } from '@mantine/core';
import { map } from 'lodash';
import { sidebarTabsConfig } from '../config/sidebar.config';
import { Suspense } from 'react';

export const SideBarWidget = () => {
  return (
    <SideBar>
      <Header />
      <SideBarTaber>
        {map(sidebarTabsConfig, (component, i) => (
          <Box key={i}>
            <Suspense
              fallback={
                <Center py="md">
                  <Loader />
                </Center>
              }
            >
              <component.render />
            </Suspense>
          </Box>
        ))}
      </SideBarTaber>
    </SideBar>
  );
};
