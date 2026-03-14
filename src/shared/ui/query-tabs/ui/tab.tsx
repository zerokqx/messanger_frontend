import { AnimatePresence } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import { useDrag } from '@use-gesture/react';
import * as m from 'motion/react-m';
import { useAnimationResolve } from '../lib';
import { useCurrentTab, useTabActions } from '../model';
import { act } from 'react';

export const Tab: TabsComponent['Tab'] = ({
  children,
  value,
  animationVariant,
  animationClosed,
}) => {
  const actions = useTabActions();
  const bind = useDrag(
    ({ last, swipe: [sx] }) => {
      if (!last) return;

      if (sx === 1) {
        actions.back();
      }
    },
    {
      swipe: {
        distance: 50,
        velocity: 0.3,
      },
      axis: 'x',
      pointer: {
        touch: true,
      },
    }
  );
  const state = useCurrentTab();
  const animation = useAnimationResolve(animationVariant, animationClosed);
  const isActive = state === value;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <m.div
          {...bind()}
          key={value}
          animate={'open'}
          initial={'initial'}
          exit={'closed'}
          variants={animation}
          style={{
            touchAction: 'pan-y',
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
  animationClosed,
  children,
}) => {
  const state = useCurrentTab();
  const animation = useAnimationResolve(animationVariant, animationClosed);
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
