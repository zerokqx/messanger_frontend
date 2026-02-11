import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { QuickLinks } from './quick-links';
import { tabs } from '@/shared/ui/query-tabs';
import { quickTabs, quickTabsSettings } from '../config/tabs';

interface QuickLinksBarProps {
  showMainPanel: boolean;
  showSettingsPanel: boolean;
  currentNavbar: string;
  currentSettings: string;
  moitonProps?: MotionProps;
}
export const QuickLinksBar = ({
  moitonProps,
  currentNavbar,
  currentSettings,
  showMainPanel,
  showSettingsPanel,
}: QuickLinksBarProps) => {
  return (
    <AnimatePresence mode="popLayout">
      {showMainPanel && (
        <motion.div
          exit={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -200, opacity: 0 }}
          key={'tnavbar-links'}
          {...moitonProps}
        >
          <QuickLinks
            activeValue={currentNavbar}
            onClickLink={(v) => {
              tabs.tabsHistoryAction.doPush('tnavbar', v);
            }}
            links={quickTabs}
          />
        </motion.div>
      )}

      {showSettingsPanel && (
        <motion.div
          exit={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -200, opacity: 0 }}
          key={'tsettings-links'}
          {...moitonProps}
        >
          <QuickLinks
            activeValue={currentSettings}
            onClickLink={(v) => {
              tabs.tabsHistoryAction.doPush('tsettings', v);
            }}
            links={quickTabsSettings}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
