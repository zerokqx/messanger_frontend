import type { SecondActionProp } from '@/shared/ui/form/types/second-action-prop.type';
import type { useLogin } from '../api';

export interface LoginFormProp {
  mutateProps?: Parameters<ReturnType<typeof useLogin>['mutate']>[1];
  onSecondActionClick?: SecondActionProp['onClick'];
}
