import { UserBadge } from '@/entities/user';
import { IsAuth } from '@/features/checkAuth/ui';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import { SideBar } from '@/shared/ui/SideBar';
import { Flex, Text } from '@mantine/core';
import { useRouter } from '@tanstack/react-router';
import { Cog, Lightbulb, MessageCircle, User, Video } from 'lucide-react';

export const SideBarLayout = () => {
  const settings = useModalGlobal((s) => s.pinOpen)('settings');
  const navigate = useRouter().navigate;
  const login = useModalGlobal((s) => s.pinOpen)('login');
  const register = useModalGlobal((s) => s.pinOpen)('register');
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
              onClick: (e) => {
                console.log(e.timeStamp);
              },
              direction: 'column',
              gap: 'md',
            }}
          >
            <Text>Чтобы получить полный функционал необходимо войти</Text>
            <Flex gap={'md'}>
              <CustomMantineButton
                onClick={register}
                bdrs={'xl'}
                variant="subtle"
              >
                Зарегистрироваться
              </CustomMantineButton>
              <CustomMantineButton bdrs={'xl'} onClick={login}>
                Войти
              </CustomMantineButton>
            </Flex>
          </SideBar.InfoBlock>
        </IsAuth>
      </SideBar>
    </>
  );
};
