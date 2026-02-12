import {
  Settings,
  UserRound,
  Users,
  ArrowLeft,
  ShieldPlus,
  Palette,
  MessageCircle,
} from 'lucide-react';
import type { QuickLinksData } from '../ui/quick-links';
export const quickTabs: QuickLinksData<'tnavbar'>[] = [
  { value: 'main', label: 'Main', icon: <MessageCircle /> },
  { value: 'contacts', label: 'Contacts', icon: <Users /> },
  { value: 'profile', label: 'Profile', icon: <UserRound /> },
  { value: 'settings', label: 'Settings', icon: <Settings /> },
];

export const quickTabsSettings: QuickLinksData<'tsettings'>[] = [
  { value: 'main', label: 'Main', icon: <ArrowLeft /> },
  { value: 'interface', label: 'Interface', icon: <Palette /> },
  { value: 'sessions', label: 'Sessions', icon: <ShieldPlus /> },
];
