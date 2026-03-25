import { Menu } from '@mantine/core';
import type { IContactElementProp } from './types';
import { useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Trash } from 'lucide-react';
import { HorizontalUserCard } from '@/entities/user';

export const ContactCard = ({
  user,
  onClick,
  isSelected,
  simplification,
  onRemove,
}: IContactElementProp) => {
  const [opened, toggle] = useToggle();
  const [t] = useTranslation('contact-menu');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const handler = () => {
      if (document.hidden) toggle(false);
    };
    document.addEventListener('visibilitychange', handler);

    return () => {
      document.removeEventListener('visibilitychange', handler);
    };
  }, [toggle]);
  return (
    <Menu
      transitionProps={{ transition: 'pop' }}
      opened={opened}
      onClose={() => {
        toggle(false);
      }}
      withArrow
    >
      <Menu.Target>
        <HorizontalUserCard
          isSelected={isSelected}
          value={user}
          onClick={(e) => {
            if (!opened) onClick?.(e);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setPosition({
              x: e.clientX,
              y: e.clientY,
            });

            toggle(true);
          }}
          w={'100%'}
        >
          <HorizontalUserCard.Avatar />
          <HorizontalUserCard.Login />
        </HorizontalUserCard>
      </Menu.Target>
      {opened && !simplification && (
        <Menu.Dropdown left={position?.x} top={position?.y}>
          <Menu.Item
            onClick={() => {
              onRemove?.(user.user_id);
            }}
            leftSection={<Trash />}
            color="red"
          >
            {t('contact-remove')}
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
