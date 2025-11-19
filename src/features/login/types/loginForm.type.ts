import type { SecondActionProp } from '@/shared/ui/Form/types/secondActionProp.type';
import type { useLogin } from '../api';

export interface LoginFormProp {
  mutateProps?: Parameters<ReturnType<typeof useLogin>['mutate']>[1];
  onSecondActionClick?: SecondActionProp['onClick'];
}
