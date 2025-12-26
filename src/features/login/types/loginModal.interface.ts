import type { AllModals } from '@/shared/model/useModalStore';

export interface ILoginModalProps {
  whatClose: Exclude<AllModals, 'login'>;
}
