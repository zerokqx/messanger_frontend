import type { AvatarProps } from '@mantine/core';
import type { ComponentProps, ReactNode } from 'react';

export interface UserProfileProps<T = Record<string, unknown>> {
  children: ReactNode;
  profile: T;
}
export type UserProfileAvatarProps = Omit<
  AvatarProps & ComponentProps<'img'>,
  'src' | 'name'
>;

export interface UserProfileCompoundComponent {
  <T extends Record<string, unknown>>(props: UserProfileProps<T>): ReactNode;
  Login: () => ReactNode;
  Avatar: (props: UserProfileAvatarProps) => ReactNode;
  Rating: () => ReactNode;
  CreatedAt: () => ReactNode;
  Bio: () => ReactNode;
  Verification: () => ReactNode;
  FullName: ()=>ReactNode
  YouFriends: ()=> ReactNode
}
