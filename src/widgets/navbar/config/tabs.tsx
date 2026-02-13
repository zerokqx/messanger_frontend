import {
  Settings,
  UserRound,
  Users,
  ArrowLeft,
  ShieldPlus,
  Palette,
  MessageCircle,
} from 'lucide-react';
import type { QuickLinkItem } from '../ui/quick-links';
import { panelModeActions } from '../model/panle-mode-store';

export const quickTabs: QuickLinkItem<'tnavbar'>[] = [
  { value: 'main', icon: <MessageCircle /> },
  { value: 'contacts', icon: <Users /> },
  { value: 'profile', icon: <UserRound /> },
  {
    value: 'settings',
    icon: <Settings />,
  },
];

export const quickTabsSettings: QuickLinkItem<'tsettings'>[] = [
  {
    value: 'main',
    icon: <ArrowLeft />,
  },
  { value: 'interface', icon: <Palette /> },
  { value: 'sessions', icon: <ShieldPlus /> },
];
