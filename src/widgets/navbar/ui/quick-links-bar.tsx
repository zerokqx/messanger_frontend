import { AnimatePresence, motion } from 'motion/react';
import { QuickLinks } from './quick-links';
import { tabs } from '@/shared/ui/query-tabs';
import { quickTabs, quickTabsSettings } from '../config/tabs';

interface QuickLinksBarProps {
  showMainPanel: boolean;
  showSettingsPanel: boolean;
  currentNavbar: string;
  currentSettings: string;
}
export const QuickLinksBar = ({
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
