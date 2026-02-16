import { useAuth } from '@/shared/model/auth-provider-context';
import type { IsAuthAProp } from './types';
import { If, Then } from 'react-if';
export const IsAuth = ({ status = true, children }: IsAuthAProp) => {
  const isAuth = useAuth().isAuth;
  console.log(isAuth);
  return (
    <If condition={status === isAuth}>
      <Then>{children}</Then>
    </If>
  );
};
