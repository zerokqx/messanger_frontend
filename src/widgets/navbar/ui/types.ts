import type { TabsConfig } from '@/shared/ui/tabs';
import type { inferSideBarTaberWindows } from '@/widgets/side-bar/model/tab';
import type { ComponentType, ReactNode } from 'react';

export type AppShellTabName =
  ReturnType<typeof inferSideBarTaberWindows>[number];

export interface NavbarTabSlot extends TabsConfig {
  value: AppShellTabName;
  label: string;
  fallback?: ReactNode;
  render: ComponentType;
}
