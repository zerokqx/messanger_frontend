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
import { FormatLogin, formatLogin } from '@/shared/lib/formaters';
import { lightDark } from '@/shared/lib/light-dark';

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
  const profile = useUserProfileContext();
  const { format } = formatLogin(profile?.login, profile?.custom_name);
  return (
    <FormatLogin
      title={format}
      customName={profile?.custom_name}
      login={profile?.login}
    />
  );
};

const Avatar: HorizontalUserCardComponent['Avatar'] = (props) => {
  const profile = useUserProfileContext();
  return (
    <AvatarMantine
      {...props}
      name={formatLogin(profile?.login, profile?.custom_name, false).name}
    />
  );
};

export const HorizontalUserCard: HorizontalUserCardComponent = (
  { value, isSelected, className, ...props },
  ref?: RefObject<HTMLDivElement>
) => {
  return (
    <UserProfileContext value={value}>
      <Group
        justify="start"
        wrap="nowrap"
        ref={ref}
        style={{
          cursor: 'pointer',
        }}
        bdrs={'xl'}
        p={'xs'}
        className={[style.card, className].filter(Boolean).join(' ')}
        bg={isSelected ? lightDark('gray.0', 'dark.9') : undefined}
        bd={
          isSelected ? `1px solid ${lightDark('gray.3', 'dark.8')} ` : undefined
        }
        {...props}
      />
    </UserProfileContext>
  );
};
HorizontalUserCard.Login = Login;
HorizontalUserCard.Avatar = Avatar;
