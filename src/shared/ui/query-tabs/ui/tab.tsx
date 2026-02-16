import { AnimatePresence } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import { useTabs } from '../model';
import * as m from 'motion/react-m';
import { useAnimationResolve } from '../lib';
import { useEffect } from 'react';
import { useTabRepository } from '../model/tab-repository';

export const Tab: TabsComponent['Tab'] = ({
  children,
  value,
  animationVariant,
}) => {
  const [, setTabRepository] = useTabRepository();
  const [state] = useTabs();
  const animation = useAnimationResolve(animationVariant);
  useEffect(() => {
    setTabRepository((prev) => [...prev, value]);
    return () => {
      setTabRepository((prev) => prev.filter((tab) => tab !== value));
    };
  }, [setTabRepository, value]);
  const isActive = state.current === value;
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
