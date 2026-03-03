import { AnimatePresence } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import * as m from 'motion/react-m';
import { useAnimationResolve } from '../lib';
import { useCurrentTab } from '../model';

export const Tab: TabsComponent['Tab'] = ({
  children,
  value,
  animationVariant,
}) => {
  const state = useCurrentTab();
  const animation = useAnimationResolve(animationVariant);
  const isActive = state === value;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <m.div
          key={value}
          animate={'open'}
          initial={'initial'}
          exit={'closed'}
          variants={animation}
          style={{
            height: '100%',
          }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const TabsKeepMounted: TabsComponent['TabKeepMounted'] = ({
  value,
  animationVariant,
  children,
}) => {
  const state = useCurrentTab();
  const animation = useAnimationResolve(animationVariant);
  const isActive = state === value;
  return (
    <m.div
      key={value}
      animate={isActive ? 'open' : 'closed'}
      initial={'initial'}
      variants={animation}
      style={{
        display: isActive ? 'block' : 'none',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </m.div>
  );
};
