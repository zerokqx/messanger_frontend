import { AnimatePresence } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import { useTabs, useTabsAnimationVariant } from '../model';
import * as m from 'motion/react-m';
import { animationVariants } from '../lib/animation-variant';

export const Tab: TabsComponent['Tab'] = ({
  children,
  value,
  animationVariant,
  withAnimation = true,
}) => {
  const [state] = useTabs();
  const isActive = state.current === value;
  const [animationVariantFromContext] = useTabsAnimationVariant();
  const variantKey =
    animationVariant ?? animationVariantFromContext ?? 'slide-x';
  const animation = animationVariants[variantKey];

  if (!withAnimation || variantKey === 'none') {
    return isActive ? <>{children}</> : null;
  }
  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <m.div
          key={value}
          animate={'open'}
          initial={'initial'}
          exit={'closed'}
          variants={animation}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};
