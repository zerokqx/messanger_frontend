import type { TabsComponent } from './tabs.type';
import { useTabsApi } from '../model';

export const UseApi: TabsComponent['UseApi'] = ({ children }) => {
  const [actions, state] = useTabsApi();
  return <>{children({ actions, state })}</>;
};
