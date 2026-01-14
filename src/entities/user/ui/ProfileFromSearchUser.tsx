import { Center } from '@mantine/core';
import { UserProfile } from './profile/profile.tsx';
import type { IProfileContext } from '../model/types/profile-context.types';

export const ProfileFromSearchUser = ({
  profile,
}: {
  profile: IProfileContext;
}) => {
  return (
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
};
