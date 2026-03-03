import type { TabsComponent } from './tabs.type';
import { useAnimationResolve, whenStatus } from '../lib';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useCurrentTab } from '../model';

export const Show: TabsComponent['Show'] = ({
  when,
  children,
  animationVariant,
}) => {
  const  state= useCurrentTab();
  const animation = useAnimationResolve(animationVariant);
  const ok = whenStatus(when, state);

  return (
    <AnimatePresence mode="popLayout">
      {ok && (
        <m.div
          key={'element-for-animate'}
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
