import { createStateContext } from 'react-use';

export interface ApiTabsProvider {
  push: (v: string) => void;
  back: () => void;
}
export const [useApiTabs, ApiTabsProvider] =
  createStateContext<ApiTabsProvider>({
    push: () => undefined,
    back: () => undefined,
  });
