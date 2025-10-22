import { UserBadge } from '@/entities/user';
import { IsAuth } from '@/features/checkAuth/ui';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { SideBar } from '@/shared/ui/SideBar';
import { useRouter } from '@tanstack/react-router';
import { Cog, Lightbulb, MessageCircle, User, Video } from 'lucide-react';

export const SideBarLayout = () => {
  const settings = useModalGlobal((s) => s.pinOpen)('settings');
  const navigate = useRouter().navigate;
  return (
    <>
      <SideBar renderUserBadge={() => <UserBadge />}>
        <SideBar.Item inDev text="Видео">
          <ColoredIcons Icon={Video} />
        </SideBar.Item>
        <SideBar.Item
          onClick={() => {
            void navigate({ to: '/videos' });
          }}
          text="Чаты"
        >
          <ColoredIcons Icon={MessageCircle} />
        </SideBar.Item>
        <IsAuth>
          <SideBar.Item text="Профиль">
            <ColoredIcons Icon={User} />
          </SideBar.Item>
          <SideBar.Item text="Настройки" onClick={settings}>
            <ColoredIcons Icon={Cog} />
          </SideBar.Item>
        </IsAuth>

        <IsAuth status={false}>
          <SideBar.InfoBlock
            inline
            accent
            icon={<ColoredIcons Icon={Lightbulb} />}
            flexProps={{
              direction: 'column',
              gap: 'md',
            }}
          >
            Чтобы получить полный функционал необходимо войти
            <CustomMantineButton variant="subtle">
              Зарегистрироваться
            </CustomMantineButton>
            <CustomMantineButton bdrs={'xl'}>Войти</CustomMantineButton>
          </SideBar.InfoBlock>
        </IsAuth>
      </SideBar>
    </>
  );
};
