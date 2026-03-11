import { AnimatePresence } from 'motion/react';
import { useAnimationResolve, useWhenStatus } from '../lib';
import type { TabsComponent } from './tabs.type';

import * as m from 'motion/react-m';
export const MutallyExclusive: TabsComponent['MutallyExclusive'] = ({
  when,
  animationClosed,
  animationVariant,
  children,
}) => {
  const ok = useWhenStatus(when);
  const animation = useAnimationResolve(animationVariant, animationClosed);
  return (
    <AnimatePresence mode="popLayout">
      {ok && (
        <m.div
          key={'first-children'}
          animate={'open'}
          initial={'initial'}
          exit={'closed'}
          variants={animation}
        >
          {children[0]}
        </m.div>
      )}

      {!ok && (
        <m.div
          key={'second-children'}
          animate={'open'}
          initial={'initial'}
          exit={'closed'}
          variants={animation}
        >
          {children[1]}
        </m.div>
      )}
    </AnimatePresence>
  );
};
