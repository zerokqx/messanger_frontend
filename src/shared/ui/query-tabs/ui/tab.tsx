import { motion } from 'motion/react';
import type { TabsComponent } from './tabs.type';
import { useTabs } from '../model';

export const Tab: TabsComponent['Tab'] = ({ children, value }) => {
  const [state] = useTabs();

  if (state.current !== value) return null;

  return (
    <motion.div
      key={value}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
