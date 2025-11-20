import { useUserStore } from './userStore';

export const useIsThatMe = (uuid: string) => {
  const me = useUserStore((s) => s.data.user_id);
  return uuid === me;
};
