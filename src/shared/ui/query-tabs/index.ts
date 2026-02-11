import { useTabs } from './lib/tabs';
import { tabsHistoryAction, useTabsHistory } from './model/tabs-history';
import { Tabs, TabsInit } from './ui/tabs';
import { TabsNavigate } from './ui/tabs-navigate';

export { useTabs } from './lib/';
export {
  type TabsHistoryAction,
  type TabsDeclaration,
  type TabsDeclarationKeys,
} from './model/';
export {
  Tabs,
  TabsInit,
  TabsNavigate,
  type TabsTab,
  type TabsObject,
} from './ui/';

export const tabs = {
  tabsHistoryAction,
  useTabs,
  useTabsHistory,
  Tabs,
  TabsNavigate,
  TabsInit,
};
