import { Button, Center } from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { UserProfile } from './profile';
import { useIsMe } from '../lib/use-is-me';

interface ProfileForGetUserByIdProps {
  profile: components['schemas']['ProfileByUserIdData'];
}

export const ProfileForGetUserById = ({
  profile,
}: ProfileForGetUserByIdProps) => {
  const isMe = useIsMe(profile.user_id);

  return (
    <UserProfile profile={profile}>
      <Center>
        <UserProfile.Avatar size={'xl'} />
      </Center>
      <UserProfile.Login />
      <UserProfile.FullName />
      <UserProfile.Rating />
      <UserProfile.CreatedAt />
      <UserProfile.Bio />
      <UserProfile.Verification />
      {!isMe && <UserProfile.YouFriends />}
    </UserProfile>
  );
};
