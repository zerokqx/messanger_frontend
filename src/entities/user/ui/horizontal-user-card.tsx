import type { ReactNode } from 'react';
import style from './horizontal-user-card.module.css';
import {
  UserProfileContext,
  useUserProfileContext,
  type UserProfileContextState,
} from '../model/user-profile-context';
import {
  Text,
  Avatar as AvatarMantine,
  Group,
  type GroupProps,
} from '@mantine/core';
import { formatLogin } from '@/shared/lib/formaters';

interface HorizontalUserCardProps extends GroupProps {
  value: UserProfileContextState;
}

interface HorizontalUserCardComponent {
  (props: HorizontalUserCardProps): ReactNode;
  Login: () => ReactNode;

  Avatar: () => ReactNode;
}
export const Login = () => {
  const [profile] = useUserProfileContext();
  return <Text>{profile?.login}</Text>;
};

export const Avatar = () => {
  const [profile] = useUserProfileContext();
  return (
    <AvatarMantine
      name={formatLogin(
        profile?.login,
        profile?.custom_name,
        false
      ).format.slice(0, 2)}
    />
  );
};

export const HorizontalUserCard: HorizontalUserCardComponent = ({
  value,
  className,
  ...props
}) => {
  return (
    <UserProfileContext initialValue={value}>
      <Group
        style={{
          cursor: 'pointer',
        }}
        bdrs={'xl'}
        p={'xs'}
        className={[style.card, className].filter(Boolean).join(' ')}
        {...props}
      />
    </UserProfileContext>
  );
};
HorizontalUserCard.Login = Login;
HorizontalUserCard.Avatar = Avatar;
