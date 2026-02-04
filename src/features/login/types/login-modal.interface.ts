import type { AllModals } from '@/shared/model/use-modal-store';

export interface ILoginModalProps {
  whatClose: Exclude<AllModals, 'login'>;
}
