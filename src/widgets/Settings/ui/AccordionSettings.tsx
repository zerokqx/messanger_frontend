import { Accordion, Flex, useMantineTheme } from '@mantine/core';
import { ColoredIcons } from '@/shared/ui/ColoredIcon';
import type { AccordionSettingsProp } from '../types';

export const AccordionSetting = ({
  label,
  icon,
  children,
}: AccordionSettingsProp) => {
  const t = useMantineTheme();
  return (
    <Accordion
      variant="contained"
      styles={{
        control: {
          borderRadius: t.radius.md,
          background: 'none',
        },
        item: {
          background: 'transparent',
        },
      }}
    >
      <Accordion.Item value={label}>
        <Accordion.Control icon={<ColoredIcons Icon={icon} />} color="red">
          {label}
        </Accordion.Control>
        <Accordion.Panel>
          <Flex direction={'column'} gap={'md'}>
            {children}
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
