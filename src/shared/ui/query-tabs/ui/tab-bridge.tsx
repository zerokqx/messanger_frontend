import type { TabsComponent } from './tabs.type';
import { useEffect } from 'react';
import { useTabsApi } from '../model';

export const Bridge: TabsComponent['Bridge'] = ({ref}) => {
  const [actions] = useTabsApi();

  useEffect(() => {
    ref.current = actions;
  }, [ref, actions]);

  return null;
};
