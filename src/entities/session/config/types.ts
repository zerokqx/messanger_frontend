import type { DefaultMantineColor } from '@mantine/core';
import type { ComponentType } from 'react';
import type UAParser from 'ua-parser-js';

export type BrowserToColor = Record<
  string,
  { icon: ComponentType; color: DefaultMantineColor }
>;

export type DeviceToIcon = Record<
  NonNullable<UAParser.IDevice['type']> | 'unknow',
  { icon: ComponentType; color: DefaultMantineColor }
>;
