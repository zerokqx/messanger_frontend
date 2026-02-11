import { Center } from '@mantine/core';
import { createUserProfile } from './create-user-profile';
import type { components } from '@/shared/types/v1';
import { Suspense } from 'react';
import { BioSkeleton } from './profile/lazy/bio';

export const [ProfileForCurrentUser] = createUserProfile<
  components['schemas']['ProfileData']
>((UserProfile) => ({ profile }) => (
  <UserProfile profile={profile}>
    <Center>
      <UserProfile.Avatar size={'xl'} />
    </Center>
    <UserProfile.Login />
    <UserProfile.Rating />
    <UserProfile.CreatedAt />
    <Suspense fallback={<BioSkeleton />}>
      <UserProfile.Bio />
    </Suspense>
    <UserProfile.Verification />
  </UserProfile>
));
