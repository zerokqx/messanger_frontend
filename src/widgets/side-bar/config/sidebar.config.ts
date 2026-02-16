import type { TabsConfig } from '@/shared/ui/tabs';
import { lazy } from 'react';

export const sidebarTabsConfig: TabsConfig[] = [
  {
    render: lazy(() =>
      import('@/widgets/tab-contacts').then((m) => ({
        default: m.ContactsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-main').then((m) => ({ default: m.MainTab }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-profile').then((m) => ({ default: m.ProfileTab }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-profile-edit').then((m) => ({
        default: m.ProfileEditTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-settings').then((m) => ({
        default: m.SettingsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-profile-settings').then((m) => ({
        default: m.ProfileSettingsTab,
      }))
    ),
  },
  {
    render: lazy(() =>
      import('@/widgets/tab-interface-edit').then((m) => ({
        default: m.InterfaceEditTab,
      }))
    ),
  },

  {
    render: lazy(() =>
      import('@/widgets/tab-sessions').then((m) => ({
        default: m.SessionManage,
      }))
    ),
  },
];
