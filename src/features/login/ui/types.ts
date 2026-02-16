import type { AllModals } from '@/shared/model/use-modal-store';
import type { SecondActionProp } from '@/shared/ui/form/types/second-action-prop.type';
import type { useLogin } from '../api';

export interface LoginFormProps {
  mutateProps?: Parameters<ReturnType<typeof useLogin>['mutate']>[1];
  onSecondActionClick?: SecondActionProp['onClick'];
}

export interface LoginModalProps {
  whatClose: Exclude<AllModals, 'login'>;
}
