import { Box, CloseButton, Group } from '@mantine/core';
import { useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/widgets/aside/model';
import type { AsideBusCommand } from '@/widgets/aside/model';
import { ContactMenu } from '@/features/contact';

const getHeaderContent = ({ data, type }: AsideBusCommand) => {
  switch (type) {
    case ASIDE_BUS_EVENTS.USER_SEARCH:
      return (
        !data.relationship.is_target_in_contacts_of_current_user && (
          <ContactMenu userId={data.user_id} />
        )
      );
  }
};

export const AsideHaeader = () => {
  const command = useAsideBus((s) => s.data);

  const update = useLayoutStore((s) => s.update);

  return (
    <Group justify="space-between">
      <Box>
        <CloseButton
          onClick={() => {
            update((s) => (s.asside = false));
          }}
        />
      </Box>
      {getHeaderContent(command)}
    </Group>
  );
};
