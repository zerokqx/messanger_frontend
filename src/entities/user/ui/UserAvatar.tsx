import { Avatar, type AvatarProps } from '@mantine/core';
import { useUserStore } from '../model';

export const UserAvatar = ({ ...props }: Partial<AvatarProps>) => {
  const name = useUserStore((s) => s.data.login);
  return <Avatar alt={name + ' avatar'} bg={'blue'} name={name} {...props} />;
};
