import { Avatar as MantineAvatar } from '@mantine/core';
import type { IUserProfile } from './types/user-profile.types';
import { useProfileContext } from '../../model/current-user-profile-context';

export const Avatar: IUserProfile['Avatar'] = ({ ...props }) => {
  const { avatars, login } = useProfileContext();
  if (!login && !avatars?.current?.file_id) return null;
  return (
    <MantineAvatar name={login} src={avatars?.current?.file_id} {...props} />
  );
};
