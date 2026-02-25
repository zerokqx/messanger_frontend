import { ActionIcon, Center, Group } from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { Suspense } from 'react';
import { BioSkeleton } from './profile/lazy/bio';
import { RatingSkeleton } from './profile/lazy/rating';
import { UserProfile } from './profile';
import { useTranslation } from 'react-i18next';
import { Edit } from 'lucide-react';
import { SkeletonLayout } from '@/shared/ui/skeletons';

interface ProfileForCurrentUserBaseProps {
  profile: components['schemas']['ProfileData'];
  withEdit?: false;
  onEdit?: never;
}
interface ProfileForCurrentUserWithEditProps {
  profile: components['schemas']['ProfileData'];
  withEdit: true;
  onEdit: (profile: components['schemas']['ProfileData']) => void;
}

type ProfileForCurrentUserProps =
  | ProfileForCurrentUserBaseProps
  | ProfileForCurrentUserWithEditProps;

export const ProfileForCurrentUser = (props: ProfileForCurrentUserProps) => {
  const { t } = useTranslation('button-labels');
  return (
    <UserProfile profile={props.profile}>
      <Center>
        <Group pos={'relative'} align="start" gap={'0'}>
          <UserProfile.Avatar size={'xl'} />
          {props.withEdit && (
            <ActionIcon
              title={t('edit')}
              onClick={() => {
                props.onEdit(props.profile);
              }}
              right={0}
              top={0}
              variant="subtle"
              bdrs={'xl'}
              pos={'absolute'}
            >
              <Edit />
            </ActionIcon>
          )}
        </Group>
      </Center>
      <UserProfile.Login />
      <Suspense fallback={<RatingSkeleton />}>
        <UserProfile.Rating />
      </Suspense>
      <UserProfile.CreatedAt />
      <Suspense fallback={<BioSkeleton />}>
        <UserProfile.Bio />
      </Suspense>
      <UserProfile.Verification />
    </UserProfile>
  );
};
