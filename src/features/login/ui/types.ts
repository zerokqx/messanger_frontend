import type { SecondActionProp } from '@/shared/ui/form/types/second-action-prop.type';
import type { useLogin } from '../api';
import type { AllModals } from '@/shared/model/use-modal-store';

export interface LoginFormProp {
  mutateProps?: Parameters<ReturnType<typeof useLogin>['mutate']>[1];
  onSecondActionClick?: SecondActionProp['onClick'];
}

export interface ILoginModalProps {
  whatClose: Exclude<AllModals, 'login'>;
}
