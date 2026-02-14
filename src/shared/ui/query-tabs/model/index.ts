export type { TabsDeclaration, TabsDeclarationKeys } from './tabs-types.ts';
export {
  tabsHistoryAction,
  useTabsHistory,
  type TabsHistoryAction,
} from './tabs-history.ts';

export {
  useSharedQueryName,
  SharedQueryNameProvider as SharedQueryKeyProvider,
} from './querykey-context.ts';
