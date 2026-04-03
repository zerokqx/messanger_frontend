import { useRemoveFromBlacklist } from '@/entities/user';
import { useBlacklist } from '@/features/blocklist-manager/api/blacklist';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { border } from '@/shared/lib/css-utils';
import { lightDark } from '@/shared/lib/light-dark';
import { comboRelations } from '@/shared/lib/realtionship-helpers';
import { useSettingsStore } from '@/shared/lib/settings';
import { Button, Group, Text, ThemeIcon } from '@mantine/core';
import { Lock } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';

interface FooterChatUserBlockedProps {
  children?: ReactNode;
  targetUser: Pick<ProfileByUserIdData, 'login' | 'relationship' | 'user_id'>;
}
export const FooterChatUserBlocked = ({
  children,
  targetUser: { relationship, login, user_id },
}: FooterChatUserBlockedProps) => {
  const { mutateAsync: unblock } = useRemoveFromBlacklist();
  const relations = useMemo(() => comboRelations(relationship), [relationship]);
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);

  return relations.oneOfTheBlocked ? (
    <Group
      p={'md'}
      styles={{
        root: {
          borderTop: border('1px', 'solid', lightDark('gray.3', 'dark.4')),
        },
      }}
      justify="center"
    >
      {(() => {
        if (relationship.is_target_user_blocked_by_current_user) {
          return (
            <Button
              color="red"
              onClick={async () => {
                await unblock({
                  data: {
                    user_id,
                  },
                });
              }}
              variant="light"
            >
              Unblock
            </Button>
          );
        }

        if (relationship.is_current_user_in_blacklist_of_target) {
          return (
            <Text>
              <Text span c={primaryColor}>
                {login}
              </Text>
              blocked you
            </Text>
          );
        }

        return null;
      })()}
    </Group>
  ) : (
    children
  );
};
