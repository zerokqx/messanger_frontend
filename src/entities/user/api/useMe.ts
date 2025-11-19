import { useEffect } from 'react';
import { useMeRequest } from './useMeRequest';
import { doInit } from '../model/userStore';

export const useMe = () => {
  const { isSuccess, data } = useMeRequest();

  useEffect(() => {
    if (isSuccess) {
      doInit(data);
    }
  }, [isSuccess, data]);
};
