import { Palette, Shield } from 'lucide-react';
import type { TabConfig } from '../model/types';

export const rootTabs = [
  {
    value: 'settings/interface',
    leftSection: <Palette />,
  } as const,

  {
    value: 'settings/sessions',
    leftSection: <Shield />,
  } as const,
] satisfies TabConfig[];
