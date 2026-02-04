/**
 * @description Функция для конвертирования профиля с user_id в структуру где профиль в своем ключе а user_id в своем
 */
export const toPlainProfile = <
  T extends { user_id: string; [key: string]: unknown },
>(
  profile: T
): { user_id: T['user_id']; profile: T } => {
  return { user_id: profile.user_id, profile: profile };
};
