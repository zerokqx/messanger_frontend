import { useRef } from 'react';
import type { Actions, TabsComponent } from '../ui/tabs.type';

export const useBridgeRef: TabsComponent['useBridgeRef'] = () => {
  return useRef<Actions | null>(null);
};
