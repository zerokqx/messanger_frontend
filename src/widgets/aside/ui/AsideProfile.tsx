import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { userAction } from '@/entities/user/model/userStore';
import Logger from '@/shared/lib/logger/logger';
import { useSelectedSearchUser } from '@/features/selected-user';
import { ProfileFromSearchUser } from '@/entities/user/ui/ProfileFromSearchUser';
import { useAsideRender, useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { isValidElement } from 'react';

export const AssideProfile = () => {
  const profile = useSelectedSearchUser((s) => s.data.user?.profile);
  const isMe = userAction.doIsThatMe(profile?.user_id ?? '');
  const render = useAsideRender();

  console.log(render);
  Logger.info('AsideProfile', 'profile user', profile);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {isValidElement(render) && render}
      <SelectedProfileButtonAction />
      {profile && (
        <>
          {!isMe && (
            <>
              <Space h={'1rem'} />
            </>
          )}
        </>
      )}
    </AppShellAside>
  );
};
