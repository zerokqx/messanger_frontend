import { createStateContext } from 'react-use';
import type { TabAnimationVariant } from '../ui/tabs.type';

export const [useTabsAnimationVariant, TabsAnimationVariantProvider] =
  createStateContext<TabAnimationVariant | undefined>(undefined);
