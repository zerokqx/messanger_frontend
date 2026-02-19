import { createStateContext } from 'react-use';
import type { MotionStagerListAnimationVariant, VariantsType } from './types';

const defaultValue = {
  hidden: {},
  visible: {},
};
export const [useVariantContext, VariantContext] =
  createStateContext<VariantsType>({
    container: defaultValue,
    item: defaultValue,
  });
