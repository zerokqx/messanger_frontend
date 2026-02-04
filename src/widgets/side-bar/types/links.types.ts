import type { ReactNode } from 'react';
import type { inferSideBarTaberWindows } from '../model/tab';
import type { Resources } from 'i18next';

export interface ILinkSidebar {
  to: ReturnType<typeof inferSideBarTaberWindows>[number];
  icon: ReactNode;
  i18n: keyof Resources['sideBar'];
  children?: string;
}
