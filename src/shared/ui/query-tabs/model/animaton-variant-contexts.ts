import { createStateContext } from 'react-use';
import type { TabAnimationVariant } from '../lib';

export const [useTabsAnimationVariant, TabsAnimationVariantProvider] =
  createStateContext<TabAnimationVariant | undefined>(undefined);
