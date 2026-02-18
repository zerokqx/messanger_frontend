import type { Actions } from '../ui/tabs.type';
import type { RefObject } from 'react';

export interface ExternalController {
  controller: RefObject<Actions | null>;
}
