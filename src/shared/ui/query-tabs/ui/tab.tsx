import { AnimatePresence } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import { useTabs } from '../model';
import * as m from 'motion/react-m';
import { useAnimationResolve, type DirectionVariants } from '../lib';
import { useEffect, useMemo, useState } from 'react';
import { useTabRepository } from '../model/tab-repository';
import { conforms } from 'lodash';

export const Tab: TabsComponent['Tab'] = ({
  children,
  value,
  animationVariant,
}) => {
  const [tabRepository, setTabRepository] = useTabRepository();
  const [direction, setDirection] = useState<DirectionVariants>('next');
  const [state] = useTabs();
  const animation = useAnimationResolve(animationVariant);
  // useEffect(() => {
  //   setTabRepository((prev) => [...prev, value]);
  //   return () => {
  //     setTabRepository((prev) => prev.filter((tab) => tab !== value));
  //   };
  // }, [setTabRepository, value]);
  const isActive = state.current === value;
  // const indexes = useMemo(() => {
  //   const currentIndexFromValue = tabRepository.indexOf(value);
  //   const currentIndexFromState = tabRepository.indexOf(state.current);
  //   return { currentIndexFromState, currentIndexFromValue };
  // }, [value, state.current, tabRepository]);
  // console.log(indexes);
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
