import type { ComponentType, ReactNode } from 'react';

interface BaseTabsConfig {
  render: ComponentType;
}

export type TabsConfig<Fallback extends boolean = false> =
  Fallback extends false
    ? BaseTabsConfig
    : BaseTabsConfig & { fallback: ReactNode };
