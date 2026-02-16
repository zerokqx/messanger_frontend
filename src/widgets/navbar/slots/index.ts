import { lazy } from 'react';
import type { NavbarTabSlot } from '../ui/types';

export const searchTabSlot: NavbarTabSlot = {
  value: 'search',
  label: 'Search',
  render: lazy(() =>
    import('../ui/tabs/search.tab').then((m) => ({ default: m.SearchTab }))
  ),
  fallback: null,
};

export const mainTabSlot: NavbarTabSlot = {
  value: 'main',
  label: 'Main',
  render: () => null,
  fallback: null,
};

export const contactsTabSlot: NavbarTabSlot = {
  value: 'contacts',
  label: 'Contacts',
  render: lazy(() =>
    import('@/widgets/tab-contacts').then((m) => ({
      default: m.ContactsTab,
    }))
  ),
  fallback: null,
};

export const profileTabSlot: NavbarTabSlot = {
  value: 'profile',
  label: 'Profile',
  render: lazy(() =>
    import('@/widgets/tab-profile').then((m) => ({
      default: m.ProfileTab,
    }))
  ),
  fallback: null,
};

export const profileEditTabSlot: NavbarTabSlot = {
  value: 'profile_edit',
  label: 'Edit profile',
  render: lazy(() =>
    import('@/widgets/tab-profile-edit').then((m) => ({
      default: m.ProfileEditTab,
    }))
  ),
  fallback: null,
};

export const settingsTabSlot: NavbarTabSlot = {
  value: 'settings',
  label: 'Settings',
  render: lazy(() =>
    import('@/widgets/tab-settings').then((m) => ({
      default: m.SettingsTab,
    }))
  ),
  fallback: null,
};

export const profileSettingsTabSlot: NavbarTabSlot = {
  value: 'profile_settings',
  label: 'Profile settings',
  render: lazy(() =>
    import('@/widgets/tab-profile-settings').then((m) => ({
      default: m.ProfileSettingsTab,
    }))
  ),
  fallback: null,
};

export const interfaceEditTabSlot: NavbarTabSlot = {
  value: 'interface_edit',
  label: 'Interface',
  render: lazy(() =>
    import('@/widgets/tab-interface-edit').then((m) => ({
      default: m.InterfaceEditTab,
    }))
  ),
  fallback: null,
};

export const sessionsTabSlot: NavbarTabSlot = {
  value: 'sessions',
  label: 'Sessions',
  render: lazy(() =>
    import('@/widgets/tab-sessions').then((m) => ({
      default: m.SessionManage,
    }))
  ),
  fallback: null,
};

export const navbarTabSlots: NavbarTabSlot[] = [
  searchTabSlot,
  mainTabSlot,
  contactsTabSlot,
  profileTabSlot,
  profileEditTabSlot,
  settingsTabSlot,
  profileSettingsTabSlot,
  interfaceEditTabSlot,
  sessionsTabSlot,
];
