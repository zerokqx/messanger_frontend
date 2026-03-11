import { useTabs } from '../model';
import type { TabsComponent } from './tabs.type';

export const ConditionalDisplay: TabsComponent['ConditionalDisplay'] = ({
  children,
  displayOn,

}) => {
  const [{ current }] = useTabs();
  return displayOn.includes(current) && children;
};
