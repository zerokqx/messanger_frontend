import type { TabsConfig } from '@/shared/ui/tabs';
import type { ComponentType, ReactNode } from 'react';

type AppShellTabName = string;

interface NavbarTabSlot extends TabsConfig {
  value: AppShellTabName;
  label: string;
  fallback?: ReactNode;
  render: ComponentType;
}
