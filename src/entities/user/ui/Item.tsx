import { Description } from '@/shared/ui/Description/ui';
import { WithIcon } from '@/shared/ui/WithIcon';

import { Text } from '@mantine/core';
import type { DisplayItemProp } from '../types/displayItem.type';

export const DisplayItem = ({
  descProp,
  withIconProp,
  display,
  descText,
  onClick,
  textProp,
  icon,
  children,
}: DisplayItemProp) => {
  if (!display) return null;
  return (
    <WithIcon onClick={onClick} {...withIconProp} icon={icon}>
      <Description {...descProp} desc={descText}>
        <Text {...textProp}>{display}</Text>
        {children}
      </Description>
    </WithIcon>
  );
};
