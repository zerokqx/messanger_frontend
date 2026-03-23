import { useMe } from '../model/me.query';

export const useIsMe = (userId: string) => {
  const { data: me } = useMe();
  console.log(me  );
  return userId === me.user_id;
};
