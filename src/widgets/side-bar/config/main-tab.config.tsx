import { Cog, Contact, User } from 'lucide-react';
import type { ILinkSidebar } from '../types/links.types';

export const mainTabConfig: ILinkSidebar[] = [
  {
    to: 'contacts',
    icon: <Contact />,
    i18n: 'contacts',
  },
  {
    to: 'profile',
    icon: <User />,
    i18n: 'profile',
  },
  {
    to: 'settings',
    i18n: 'settings',
    icon: <Cog />,
  },
];
