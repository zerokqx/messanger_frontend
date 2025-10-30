import { useAuth } from '@/shared/model/authProviderContext';
import type { IsAuthAProp } from '../types';
import { If } from '@/shared/ui/If';
export const IsAuth = ({ status = true, children }: IsAuthAProp) => {
  const isAuth = useAuth().isAuth;
  return (
    <If operandFirst={status} operandSecond={isAuth}>
      {children}
    </If>
  );
};
