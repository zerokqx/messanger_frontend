import { createStore } from '@colorfy-software/zfy';
import type { AsideBusCommand } from './types/aside-bus.types';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';
import { layoutAction } from '@/shared/lib/hooks/useLayout';

export const useAsideBus = createStore<AsideBusCommand>(
  'aside-bus',
  {
    type: 'undefined',
    data: undefined,
  },
  { log: true }
);

export const asideBusActions = createStoreAction(
  [
    (command: AsideBusCommand) => {
      layoutAction.doSetAside(true);
      useAsideBus.setState({ data: command });
    },
    () => {
      useAsideBus.getState().reset();
    },
  ],

  ['newCommand', 'reset']
);
