import { Description } from '@/shared/ui/Description/ui';
import { WithIcon } from '@/shared/ui/WithIcon';

import { Text } from '@mantine/core';
import type { DisplayItemProp } from '../types/displayItem.type';
import { hover } from '@/shared/styles/HoverOpacity.css';
import { useNotifyClipboard } from '@/shared/lib/hooks/useNotifyClipboard';

export const DisplayItem = ({
  descProp,
  withIconProp,
  display,
  descText,
  textProp,
  icon,
  copied,
  children,
}: DisplayItemProp) => {
  const copy = useNotifyClipboard();
  if (!display) return null;

  return (
    <WithIcon
      pl={'xs'}
      gutter={'md'}
      bdrs={'xl'}
      className={hover}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => {
        if (copied) copy(display, descText);
      }}
      {...withIconProp}
      icon={icon}
    >
      <Description {...descProp} desc={descText}>
        <Text {...textProp}>{display}</Text>
        {children}
      </Description>
    </WithIcon>
  );
};
