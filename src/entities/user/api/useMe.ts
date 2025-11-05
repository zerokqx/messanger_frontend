import { useEffect } from 'react';
import { useAuth } from '@/shared/model/authProviderContext';
import { useMeRequest } from './useMeRequest';

export const useMe = () => {
  const {
    user: { setUser },
  } = useAuth();
  const { isSuccess, data } = useMeRequest();

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data);
    }
  }, [isSuccess, data, setUser]);
};
