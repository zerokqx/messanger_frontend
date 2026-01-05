import type { TabsConfig } from '@/shared/ui/Tabs';
import { lazy } from 'react';

export const sidebarTabsConfig: TabsConfig[] = [
  {
    render: lazy(() =>
      import('../ui/tabs/Contacts.tab').then((m) => ({
        default: m.ContactsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Main.tab').then((m) => ({ default: m.MainPage }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Profile.tab').then((m) => ({ default: m.Profile }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Profile.tab.edit').then((m) => ({
        default: m.ProfileEdit,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Settings.tab').then((m) => ({ default: m.Settings }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Permissions.tab.edit').then((m) => ({
        default: m.ProfileSettingsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('../ui/tabs/Interface.tab.edit').then((m) => ({
        default: m.InterfaceEdit,
      }))
    ),
  },

  {
    render: lazy(() =>
      import('../ui/tabs/Sessions.tab').then((m) => ({
        default: m.Sessions,
      }))
    ),
  },
];
