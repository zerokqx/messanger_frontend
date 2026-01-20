import { Center } from '@mantine/core';
import { createUserProfile } from './create-user-profile';
import type { components } from '@/shared/types/v1';

export const [CurrentUserProfile] = createUserProfile<
  components['schemas']['ProfileData']
>((UserProfile) => ({ profile }) => (
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
));
