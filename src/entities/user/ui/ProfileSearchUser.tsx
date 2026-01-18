import { Center } from '@mantine/core';
import type { IProfileContext } from '../model/types/profile-context.types';
import { UserProfile } from './profile/profile';

export const ProfileSearchUser = ({
  profile,
}: {
  profile: IProfileContext;
}) => (
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
);
