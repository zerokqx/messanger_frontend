import { useEffect } from 'react';
import type { TabsComponent } from './tabs.type';
import { useCurrentTab, useTabActions } from '../model';

export const Trigger: TabsComponent['Trigger'] = ({ reset, on }) => {
  const cur = useCurrentTab();
  const actions = useTabActions();
  useEffect(() => {
    if (on === cur) {
      switch (typeof reset) {
        case 'function': {
          reset({ cur, actions });
          break;
        }
        case 'string': {
          actions.reset(reset);
          break;
        }
        default: {
          throw new Error(`Type ${typeof reset} is not string or fn`);
        }
      }
    }
  },[actions, cur, on, reset]);
  return null
};
