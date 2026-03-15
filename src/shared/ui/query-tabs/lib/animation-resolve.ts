import { useTabsAnimationVariant } from '../model';
import type { AnimationBaseProps } from '../ui/tabs.type';
import { animationVariants } from './animation-variant';

export const useAnimationResolve = (
  animationVariant?: AnimationBaseProps['animationVariant'],
  animationClosed?: AnimationBaseProps['animationClosed']
) => {
  const [animationVariantFromContext] = useTabsAnimationVariant();
  const variantKey = animationVariant ?? animationVariantFromContext ?? 'none';

  const animation = animationVariants[variantKey];
  const closed = animationClosed
    ? animationVariants[animationClosed].closed
    : animation.closed;

  return {
    initial: { ...animation.initial, pointerEvents: 'auto' },
    open: { ...animation.open, pointerEvents: 'auto' },
    closed: { ...closed, pointerEvents: 'none' },
  };
};
