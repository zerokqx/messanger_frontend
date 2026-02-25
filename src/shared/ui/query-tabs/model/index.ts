export { TabManagerProvider } from './history-provider.tsx';
export { useTabs } from './use-tabs.ts';
export { useTabsApi } from './use-tabs-api.ts';
export {
  useTabsSelector,
  useTabsDispatch,
  useCurrentTab,
  useTabHistory,
  useTabActions,
} from './tabs-selector-hooks.ts';
export type {
  TabsState,
  TabsReducer,
  TabsReducerAction,
} from './history-provider.tsx';
export type { TabsState as TabsContext } from './history-provider.tsx';
export {
  useTabsAnimationVariant,
  TabsAnimationVariantProvider,
} from './animaton-variant-contexts.ts';
export type {ExternalController} from './types.ts';
