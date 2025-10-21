import { useModalGlobal } from '@/shared/model/useModalStore';
import { useCheckAuth } from '../model';
import type { IsAuthAProp } from '../types';
export const IsAuth = ({ status = true, keyModal, children }: IsAuthAProp) => {
  const isAuth = useCheckAuth();
  console.log(isAuth);
  if (status === isAuth) {
    keyModal && useModalGlobal.getState().open(keyModal);
    return children;
  }
};
