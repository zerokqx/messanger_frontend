import 'i18next';

import type { resources } from '../clients';
import  i18next from 'i18next';
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'ns1';
    // custom resources type
    resources:  (typeof resources['ru']);
    // other
  }
}

i18next.t('')
