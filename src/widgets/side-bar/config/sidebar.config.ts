import type { TabsConfig } from '@/shared/ui/tabs';
import { lazy } from 'react';

export const sidebarTabsConfig: TabsConfig[] = [
  {
    render: lazy(() =>
      import('../ui/tabs/contacts.tab').then((m) => ({
        default: m.ContactsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/main.tab').then((m) => ({ default: m.MainPage }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/profile.tab').then((m) => ({ default: m.Profile }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/profile.tab.edit').then((m) => ({
        default: m.ProfileEdit,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/settings.tab').then((m) => ({ default: m.Settings }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/permissions.tab.edit').then((m) => ({
        default: m.ProfileSettingsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/interface.tab.edit').then((m) => ({
        default: m.InterfaceEdit,
      }))
    ),
  },

  {
    render: lazy(() =>
      import('../ui/tabs/sessions.tab').then((m) => ({
        default: m.Sessions,
      }))
    ),
  },
];
