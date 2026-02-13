import { AnimatePresence, type MotionProps } from 'motion/react';
import { QuickLinks } from './quick-links';
import { tabs } from '@/shared/ui/query-tabs';
import { quickTabs, quickTabsSettings } from '../config/tabs';
import * as m from 'motion/react-m';

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
  );
};
