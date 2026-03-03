import { createStore } from '@colorfy-software/zfy';
import type { AsideBusCommand } from './types';
import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';

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
      useAsideBus.setState({ data: command });
    },
    () => {
      useAsideBus.getState().reset();
    },
  ],

  ['newCommand', 'reset']
);
