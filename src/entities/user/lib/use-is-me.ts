import { useMe } from '../model/me.query';

export const useIsMe = (userId: string) => {
  const { data: me } = useMe();
  return userId === me.user_id;
};
