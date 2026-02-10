import type { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { AnimatePresence, motion } from 'motion/react';

export function StackTransition({
  activeKey,
  children,
}: {
  activeKey: string;
  children: ReactNode;
}) {
  return (
    <Box pos="relative" style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <Box
          key={activeKey}
          component={motion.div}
          style={{
            position: 'absolute',
            inset: 0,
          }}
          initial={{ x: 80, opacity: 0, zIndex: 10 }}
          exit={{ x: -80, opacity: 1, zIndex: 20 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          {children}
        </Box>
      </AnimatePresence>

      <Box style={{ visibility: 'hidden' }}>{children}</Box>
    </Box>
  );
}
