import type { IProfileContext } from '@/entities/user/model/types/profile-context.types';
import type { AvatarProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface IUserProfileProps {
  profile: IProfileContext;
  children?: ReactNode;
}
export type IUserProfileAvatarProps = Omit<AvatarProps, 'src' | 'name'>;
export interface IUserProfile {
  (props: IUserProfileProps): ReactNode;
  Login: () => ReactNode;
  Avatar: (props: IUserProfileAvatarProps) => ReactNode;
  Rating: () => ReactNode;
  CreatedAt: () => ReactNode;
  Bio: () => ReactNode;
  Verification: () => ReactNode;
}
