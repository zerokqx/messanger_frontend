import type { DescriptionProp } from '@/shared/ui/Description/types/description.type';
import { Description } from '@/shared/ui/Description/ui';
import { WithIcon } from '@/shared/ui/WithIcon';
import type { WithIconProp } from '@/shared/ui/WithIcon/types';
import { Text } from '@mantine/core';

export interface DisplayItemProp {
  descText: string;
  icon: WithIconProp['icon'];
  display: string | null | undefined;
  descProp?: Omit<DescriptionProp, 'desc'>;
  onClick?: WithIconProp['onClick'];
  withIconProp?: Omit<WithIconProp, 'icon' | 'onClick'>;
}
export const DisplayItem = ({
  descProp,
  withIconProp,
  display,
  descText,
  onClick,
  icon,
}: DisplayItemProp) => {
  if (!display) return null;
  return (
    <WithIcon
      onClick={onClick}
      themeIconProps={{ variant: 'transparent' }}
      {...withIconProp}
      icon={icon}
    >
      <Description {...descProp} desc={descText}>
        <Text>{display}</Text>
      </Description>
    </WithIcon>
  );
};
