import { useTabsAnimationVariant } from '../model';
import type { AnimationBaseProps } from '../ui/tabs.type';
import { animationVariants } from './animation-variant';

export const useAnimationResolve = (
  animationVariant?: AnimationBaseProps['animationVariant']
) => {
  const [animationVariantFromContext] = useTabsAnimationVariant();
  const variantKey = animationVariant ?? animationVariantFromContext ?? 'none';
  return animationVariants[variantKey];
};
