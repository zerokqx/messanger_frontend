import type { InjectProp } from '@/shared/providers/types';
import type { NavigateFn } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import type { inferSideBarTaberWindows } from './tab';
import type { Resources } from 'i18next';

interface InjectFuntion {
  settings: () => void;
  navigate: NavigateFn;
}

export type SideBarLayoutProp = InjectProp<InjectFuntion>;

export interface ILinkSidebar {
  to: ReturnType<typeof inferSideBarTaberWindows>[number];
  icon: ReactNode;
  i18n: keyof Resources['sideBar'];
  children?: string;
}
