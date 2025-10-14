import type { IconType } from 'react-icons/lib';
import { Cog, MessageCircle, User } from 'lucide-react';
import { SideBar } from '@/shared/ui/SideBar';
import { UserBadge } from '@/entities/user';

const sideBarRows: {
  Icon: IconType;
  label: string;
}[] = [
  {
    Icon: User,
    label: 'Профиль',
  },
  {
    Icon: MessageCircle,
    label: 'Чаты',
  },
  {
    Icon: Cog,
    label: 'Настройки',
  },
];

export const SideBarLayout = () => {
  return (
    <SideBar renderUserBadge={() => <UserBadge />}>
      {sideBarRows.map(({ label, Icon }, index) => (
        <SideBar.Item text={label} key={label + index.toString()}>
          <Icon />
        </SideBar.Item>
      ))}
    </SideBar>
  );
};
