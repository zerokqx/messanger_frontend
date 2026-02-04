import { useTranslation } from 'react-i18next';
import type { UseDataReturn } from './types';
import _ from 'lodash';
export function usePlurarDates(): UseDataReturn;
export function usePlurarDates<K extends keyof UseDataReturn>(
  selector: (data: UseDataReturn) => UseDataReturn[K]
): UseDataReturn[K];
export function usePlurarDates<K extends keyof UseDataReturn>(
  selector?: (data: UseDataReturn) => UseDataReturn[K]
): UseDataReturn | UseDataReturn[K] {
  const { t } = useTranslation(['plurarData']);

  const daysValues = [1, 7, 14, 30, 60, 90, 180, 365];
  const hoursValues = [2, 8, 12, 24];
  const hours: UseDataReturn[K] = _.map(hoursValues, (hour) => [
    hour,
    t('plurarData:hours', { count: hour }),
  ]);
  const days: UseDataReturn[K] = _.map(daysValues, (day) => [
    day,
    t('plurarData:days', { count: day }),
  ]);

  const result: UseDataReturn = {
    hours,
    days,
  };

  if (selector) {
    return selector(result);
  }
  return result;
}
