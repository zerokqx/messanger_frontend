import type { UseModalStore } from '@/shared/lib/isOpen/types';
import type { AllModals } from '@/shared/model/useModalStore/types/useModalGlobal.type';
import type { ReactNode } from 'react';

export interface IsAuthAProp {
  keyModal?: AllModals;
  toRootUrl?: boolean;
  status?: boolean;
  children: ReactNode;
}
