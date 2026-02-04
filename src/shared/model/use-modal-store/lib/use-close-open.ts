import type { AllModals } from '../types/use-modal-global.type';
import { useModalGlobal } from '..';

export const useCloseOpen = <Close extends AllModals>(
  close: Close,
  open: Exclude<AllModals, Close>
) => {
  const closeModal = useModalGlobal.usePinClose()(close);
  const openModal = useModalGlobal.usePinOpen()(open);
  return () => {
    closeModal();
    openModal();
  };
};
