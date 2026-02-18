import { Search } from '@/shared/ui/search';
import { Box, Stack } from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useSearchStore } from '../model';
import * as m from 'motion/react-m';
import style from './search-result-list.module.css';
import {
  HorizontalUserCard,
  Login,
} from '@/entities/user/ui/horizontal-user-card';

const container = {
  initial: {},
  open: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0 },
};

export const SearchResultList = () => {
  const selectUser = useSetUuidForRouter();
  const users = useSearchStore((s) => s.data);
  return (
    <m.div
      variants={container}
      initial="initial"
      animate="open"
      key={users.length}
    >
      <Stack gap={'0'}>
        {users.map((user) => {
          const profile =
            user.profile as components['schemas']['ProfileByUserIdData'];
          const login = profile.login ?? 'Anonymous';

          return (
            <Box
              component={m.div}
              key={user.user_id}
              bdrs={'xl'}
              p={'xs'}
              variants={item}
              className={style['search-item-result']}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                void selectUser(user.user_id);
                layoutAction.doSetAside(true);
              }}
            >
              <HorizontalUserCard value={profile}>
                <HorizontalUserCard.Avatar />
                <HorizontalUserCard.Login />
              </HorizontalUserCard>
            </Box>
          );
        })}
      </Stack>
    </m.div>
  );
};
