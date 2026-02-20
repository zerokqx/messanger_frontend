import { useBridgeRef } from '../lib';
import { TabsAnimationVariantProvider } from '../model';
import { TabManagerProvider } from '../model/history-context';
import { TabRepositoryProvider } from '../model/tab-repository';
import { ConditionalDisplay } from './conditional-display';
import { Tab } from './tab';
import { Bridge } from './tab-bridge';
import { Hide } from './tab-hide';
import { MutallyExclusive } from './tab-mutally-exclusive';
import { Show } from './tab-show';
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
      <TabsAnimationVariantProvider
        key={animationVariant ?? 'default'}
        initialValue={animationVariant}
      >
        <TabRepositoryProvider>{children}</TabRepositoryProvider>
      </TabsAnimationVariantProvider>
    </TabManagerProvider>
  );
};
Tabs.UseApi = UseApi;
Tabs.Tab = Tab;
Tabs.Hide = Hide;
Tabs.ConditionalDisplay = ConditionalDisplay;
Tabs.Bridge = Bridge;
Tabs.Show = Show;
Tabs.useBridgeRef = useBridgeRef;
Tabs.MutallyExclusive = MutallyExclusive;
