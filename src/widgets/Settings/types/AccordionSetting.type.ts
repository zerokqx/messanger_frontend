import type { ReactNode } from 'react';
import type { IconType } from 'react-icons/lib';

export interface AccordionSettingsProp {
  icon: IconType;
  label: string;
  children: ReactNode;
}
