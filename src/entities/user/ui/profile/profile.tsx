import { ProfileContext } from '../../model/profile-context';
import type { IUserProfile } from './types/user-profile.types';
import { Avatar } from './avatar';
import { Login } from './login';
import { Rating } from './ratintg';
import { CreatedAt } from './created-at';
import { Stack } from '@mantine/core';
import { Bio } from './bio';
import { Verification } from './verification';

export const UserProfile: IUserProfile = ({ profile, children }) => {
  return (
    <ProfileContext value={profile}>
      <Stack gap={'xs'} align="stretch">
        {children}
      </Stack>
    </ProfileContext>
  );
};

UserProfile.Avatar = Avatar;
UserProfile.Login = Login;
UserProfile.Rating = Rating;
UserProfile.CreatedAt = CreatedAt;
UserProfile.Bio = Bio;
UserProfile.Verification = Verification;
