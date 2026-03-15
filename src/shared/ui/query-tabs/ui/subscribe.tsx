// import { usePrevious } from 'react-use';
// import { useEffect } from 'react';
// import { useTabsSelector } from '../model/tabs-selector-hooks';
// import type { ContextSelector } from '@fluentui/react-context-selector';
// import type { TabsContextValue } from '../model/history-context';
// import type { Fn } from '@/shared/types/utils/functions';
//
// interface CallbackArgs<T> {
//   prev: string;
//   state: T;
// }
// interface SubscribeProps<S extends ContextSelector<TabsContextValue, unknown>> {
//   callback: Fn<[CallbackArgs<ReturnType<S>>]>;
//   selector: S;
// }
// export function Subscribe<
//   T extends ContextSelector<TabsContextValue, unknown>,
// >({ selector, callback }: SubscribeProps<T>) {
//   const state = useTabsSelector<ReturnType<typeof selector>>(selector);
//   const prev = usePrevious(state);
//
//   useEffect(() => {
//     callback({state: state});
//   }, [sub]);
// }
// Subscribe({
//   selector: (s) => s.state.current,
//   callback: ({ state, prev }) => {},
// });
