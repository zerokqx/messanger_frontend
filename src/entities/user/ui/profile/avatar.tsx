import { useProfileContext } from '../../model/profile-context';
import { Avatar as MantineAvatar } from '@mantine/core';
import type { IUserProfile } from './types/user-profile.types';

export const Avatar: IUserProfile['Avatar'] = ({ ...props }) => {
  const { avatars, login } = useProfileContext();
  if (!login && !avatars?.current?.file_id) return null;
  return (
    <MantineAvatar name={login} src={avatars?.current?.file_id} {...props} />
  );
};
