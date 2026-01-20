import { Center } from '@mantine/core';
import { createUserProfile } from '../create-user-profile';

export const ProfileSearchUser = createUserProfile(
  (UserProfile) =>
    ({ profile }) => (
      <UserProfile profile={profile}>
        <Center>
          <UserProfile.Avatar size={'xl'} />
        </Center>
        <UserProfile.Login />
        <UserProfile.Rating />
        <UserProfile.CreatedAt />
        <UserProfile.Bio />
        <UserProfile.Verification />
      </UserProfile>
    )
);
