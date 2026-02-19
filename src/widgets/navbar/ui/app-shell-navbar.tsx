import { AppShellNavbar } from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { MainTabs, RootTabs } from './tabs';

export const AppShellNavbarWidget = () => {
  const topApiTabs = Tabs.useBridgeRef();

  return (
    <AppShellNavbar style={{ overflow: 'auto', overflowX: 'hidden' }}>
      <RootTabs>
        <Tabs.Bridge saveTo={topApiTabs} />
        <Tabs.Tab value="main">
          <MainTabs controller={topApiTabs} />
        </Tabs.Tab>
      </RootTabs>
    </AppShellNavbar>
  );
};
