import { AppShellNavbar, Box,  } from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { MainTabs, RootTabs } from './tabs';

export const AppShellNavbarWidget = () => {
  const topApiTabs = Tabs.useBridgeRef();

  return (
    <AppShellNavbar h="100%" style={{ overflow: 'hidden' }}>
      <Box h="100%" style={{ minHeight: 0 }}>

        <RootTabs>
          <Tabs.Bridge ref={topApiTabs} />
          <Tabs.Tab value="main">
            <MainTabs controller={topApiTabs} />
          </Tabs.Tab>
        </RootTabs>
      </Box>
    </AppShellNavbar>
  );
};
