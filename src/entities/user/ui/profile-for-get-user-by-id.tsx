import { Center } from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { UserProfile } from './profile';

interface ProfileForGetUserByIdProps {
  profile: components['schemas']['ProfileByUserIdData'];
}

export const ProfileForGetUserById = ({ profile }: ProfileForGetUserByIdProps) => (
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
