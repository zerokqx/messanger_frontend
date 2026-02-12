import { Avatar } from './avatar';
import { Login } from './login';
import { Rating } from './ratintg';
import { CreatedAt } from './created-at';
import { Stack } from '@mantine/core';
import { Bio } from './bio';
import { Verification } from './verification';
import type { ReactNode } from 'react';

export const UserProfile = <T,>({
  profile,
  children,
}: {
  children: ReactNode;
  profile: T;
}) => {
  return (
    <Curr value={profile}>
      <Stack gap={'xs'} align="stretch">
        {children}
      </Stack>
    </Curr>
  );
};

UserProfile.Avatar = Avatar;
UserProfile.Login = Login;
UserProfile.Rating = Rating;
UserProfile.CreatedAt = CreatedAt;
UserProfile.Bio = Bio;
UserProfile.Verification = Verification;
