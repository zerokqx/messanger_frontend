import type { ReactNode, RefObject } from 'react';
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
  type AvatarProps,
} from '@mantine/core';
import { formatLogin } from '@/shared/lib/formaters';

interface HorizontalUserCardProps extends GroupProps {
  value: UserProfileContextState;
  isSelected?: boolean;
}

interface HorizontalUserCardComponent {
  (props: HorizontalUserCardProps): ReactNode;
  Login: () => ReactNode;

  Avatar: (props: AvatarProps) => ReactNode;
}
const Login = () => {
  const [profile] = useUserProfileContext();
  return <Text>{profile?.login}</Text>;
};

const Avatar: HorizontalUserCardComponent['Avatar'] = (props) => {
  const [profile] = useUserProfileContext();
  return (
    <AvatarMantine
      {...props}
      name={formatLogin(
        profile?.login,
        profile?.custom_name,
        false
      ).format.slice(0, 2)}

    />
  );
};

export const HorizontalUserCard: HorizontalUserCardComponent = (
  { value, isSelected, className, ...props },
  ref?: RefObject<HTMLDivElement>
) => {
  return (
    <UserProfileContext initialValue={value}>
      <Group
        ref={ref}
        style={{
          cursor: 'pointer',
        }}
        bdrs={'xl'}
        p={'xs'}
        className={[style.card, className].filter(Boolean).join(' ')}
        bd={isSelected ? '1px solid gray' : undefined}
        {...props}
      />
    </UserProfileContext>
  );
};
HorizontalUserCard.Login = Login;
HorizontalUserCard.Avatar = Avatar;
