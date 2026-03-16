import type { TabsConfig } from '@/shared/ui/tabs';
import type { ComponentType, ReactNode } from 'react';

export type AppShellTabName = string;

export interface NavbarTabSlot extends TabsConfig {
  value: AppShellTabName;
  label: string;
  fallback?: ReactNode;
  render: ComponentType;
}
