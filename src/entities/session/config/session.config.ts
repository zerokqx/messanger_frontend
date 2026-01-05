import { CircleQuestionMark, Globe, PcCase, Smartphone } from 'lucide-react';
import type { BrowserToColor, DeviceToIcon } from './types';

export const browserToColor: BrowserToColor = {
  Firefox: {
    icon: Globe,
    color: 'blue',
  },
  Chrome: {
    icon: Globe,
    color: 'blue',
  },
  unknow: {
    icon: Globe,
    color: 'gray',
  },
};

export const deviceToIcon: DeviceToIcon = {
  mobile: {
    icon: Smartphone,
    color: 'green',
  },
  desktop: {
    icon: PcCase,
    color: 'blue',
  },
  unknow: {
    icon: CircleQuestionMark,
    color: 'gray',
  },
};
