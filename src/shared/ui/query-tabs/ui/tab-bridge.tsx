import type { TabsComponent } from './tabs.type';
import { useEffect } from 'react';
import { useTabsApi } from '../model';

export const Bridge: TabsComponent['Bridge'] = ({ saveTo }) => {
  const [actions] = useTabsApi();

  useEffect(() => {
    saveTo.current = actions;
  }, [saveTo, actions]);
  return null;
};
