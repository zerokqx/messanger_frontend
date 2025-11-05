import { Avatar, type AvatarProps } from '@mantine/core';
import { useUserStore } from '../model';

export const UserAvatar = ({ ...props }: Partial<AvatarProps>) => {
  const name = useUserStore.use.login();
  return <Avatar alt={name + ' avatar'} bg={'blue'} name={name} {...props} />;
};
