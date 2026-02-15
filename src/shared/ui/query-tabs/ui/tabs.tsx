import { TabsAnimationVariantProvider } from '../model';
import { TabManagerProvider } from '../model/history-context';
import { ConditionalDisplay } from './conditional-display';
import { Tab } from './tab';
import type { TabsComponent } from './tabs.type';
import { UseApi } from './use-api';

export const Tabs: TabsComponent = ({
  children,
  initialTab,
  animationVariant,
}) => {
  return (
    <TabManagerProvider
      initialState={{
        history: [initialTab ?? 'main'],
        current: initialTab ?? 'main',
      }}
    >
      <TabsAnimationVariantProvider initialValue={animationVariant}>
        {children}
      </TabsAnimationVariantProvider>
    </TabManagerProvider>
  );
};
Tabs.UseApi = UseApi;
Tabs.Tab = Tab;
Tabs.ConditionalDisplay = ConditionalDisplay;
