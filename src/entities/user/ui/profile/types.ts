import type { AvatarProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface IUserProfileProps<T> {
  children: ReactNode;
  profile: T;
}

export type IUserProfileAvatarProps = Omit<AvatarProps, 'src' | 'name'>;

export interface IUserProfile<C extends Record<string, unknown>> {
  (props: IUserProfileProps<C>): ReactNode;
  Login: () => ReactNode;
  Avatar: (props: IUserProfileAvatarProps) => ReactNode;
  Rating: () => ReactNode;
  CreatedAt: () => ReactNode;
  Bio: () => ReactNode;
  Verification: () => ReactNode;
}
