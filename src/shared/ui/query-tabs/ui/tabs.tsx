import { TabManagerProvider } from '../model/history-context';
import { Tab } from './tab';
import type { TabsComponent } from './tabs.type';
import { UseApi } from './use-api';

export const Tabs: TabsComponent = ({ children, initialTab }) => {
  return (
    <TabManagerProvider
      initialState={{
        history: [initialTab ?? 'main'],
        current: initialTab ?? 'main',
      }}
    >
      {children}
    </TabManagerProvider>
  );
};
Tabs.UseApi = UseApi;
Tabs.Tab = Tab;
