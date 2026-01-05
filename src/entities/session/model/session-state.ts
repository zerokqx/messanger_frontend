import { FIVE_DAYS_MS } from '../config/session-state.config';
import type { TrustedSession } from './sesstion-state.types';

/**
 * @description Функция для определения прошло ли 5 дней с создания сессии от текущего дня.
 */
export const trustedSession: TrustedSession = (createdAt) => {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  return now - created >= FIVE_DAYS_MS;
};
