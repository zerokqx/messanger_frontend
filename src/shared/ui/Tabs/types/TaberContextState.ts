import type { Windows, CreateTabStore } from '../types';

export interface TaberProviderProp<T extends TabsSources> {
  value: Record<T, CreateTabStore<TabsWindows[TabsSources]>> & ;
}
