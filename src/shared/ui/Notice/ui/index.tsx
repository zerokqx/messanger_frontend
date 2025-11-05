import { AnimatePresence, motion } from 'motion/react';
import { CustomMantineButton } from '../../Button';
import type { NoticeCompouned } from '../types/notice.type';
import { Display } from './Display';
import { useId } from 'react';

export const Notice: NoticeCompouned = ({ style, ...props }) => {
  const id = useId()
  const stl = style ?? {
    right: 0,
    top: 0,
  };
  return (
    <motion.div
      key={id}
      style={{
        zIndex: 10 ^ 100,
        position: 'absolute',
        ...stl,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      {...props}
    >
      <div>
        <CustomMantineButton>Close</CustomMantineButton>
        HENTAI
      </div>
    </motion.div>
  );
};

Notice.Display = Display;
