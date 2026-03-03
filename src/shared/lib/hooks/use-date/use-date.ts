import { useTranslation } from 'react-i18next';
import type { UseDataReturn } from './types';
import { useMemo } from 'react';

export function usePlurarDates(): UseDataReturn;
export function usePlurarDates<K extends keyof UseDataReturn>(
  selector: (data: UseDataReturn) => UseDataReturn[K]
): UseDataReturn[K];

export function usePlurarDates<K extends keyof UseDataReturn>(
  selector?: (data: UseDataReturn) => UseDataReturn[K]
): UseDataReturn | UseDataReturn[K] {
  const { t } = useTranslation(['plurar-data']);

  const hours = useMemo<UseDataReturn['hours']>(
    () =>
      [2, 8, 12, 24].map(
        (hour) => [hour, t('plurar-data:hours', { count: hour })] as const
      ),
    [t]
  );

  const days = useMemo<UseDataReturn['days']>(
    () =>
      [1, 7, 14, 30, 60, 90, 180, 365].map(
        (day) => [day, t('plurar-data:days', { count: day })] as const
      ),
    [t]
  );

  const result = useMemo<UseDataReturn>(() => ({ hours, days }), [hours, days]);

  return selector ? selector(result) : result;
}
