import { ASIDE_BUS_EVENTS, asideBusActions } from '@/features/aside-bus';
import type { useGetUserById } from '@/entities/user';
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

