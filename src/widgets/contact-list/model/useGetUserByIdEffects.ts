import { ASIDE_BUS_EVENTS } from '@/features/aside';
import { asideBusActions } from '@/features/aside/model/aside-bus';
import type { useGetUserById } from '@/features/getUserById';
import { useEffect } from 'react';

export const useGetUserByIdEffects = ({
  isFetching,
  data,
  dataUpdatedAt,
}: ReturnType<typeof useGetUserById>) => {
  useEffect(() => {
    if (isFetching) {
      asideBusActions.doNewCommand({
        type: ASIDE_BUS_EVENTS.USER_CONTACT_SKELETON,
        data: true,
      });
    }
  }, [isFetching]);

  useEffect(() => {
    if (dataUpdatedAt && data) {
      asideBusActions.doNewCommand({
        type: ASIDE_BUS_EVENTS.USER_CONTACT,
        data: data,
      });
    }
  }, [data, dataUpdatedAt]);
};
