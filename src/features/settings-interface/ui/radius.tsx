import { useSettingsStore, type Radius } from '@/shared/lib/settings';
import { Button, NumberInput, SimpleGrid, Stack } from '@mantine/core';
import { LucideTimerReset, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TextTitle } from './text-title';
import { RadiusSchema } from '@/shared/lib/settings/settings/model/types';

const DEFAULT_RADIUS: Radius = {
  xs: '0px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

const px = (value: number | string) => `${value}px`;

const toNumber = (v: string) => Number(v.replace('px', ''));

const Input = NumberInput.withProps({
  allowNegative: false,
  allowDecimal: false,
  variant: 'filled',
  max: 32,
  suffix: 'px',
});

const radiusKeys: (keyof Radius)[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const radiusLabelMap: Record<keyof Radius, string> = {
  xs: 'radius-size-xs',
  sm: 'radius-size-sm',
  md: 'radius-size-md',
  lg: 'radius-size-lg',
  xl: 'radius-size-xl',
};

export const RadiusForm = () => {
  const [t] = useTranslation('settings-tab');
  const radius = useSettingsStore((s) => s.data.radius);
  const update = useSettingsStore((s) => s.update);

  const handleChange = (key: keyof Radius, value: string | number) => {
    const nextValue = px(value);

    update((s) => {
      s.radius[key] = nextValue;
    });
  };

  const handleReset = () => {
    update((s) => {
      s.radius = RadiusSchema.parse({});
    });
  };

  return (
    <Stack bdrs={'xl'} bg="dark" p="xs">
      <TextTitle>{t('radius')}</TextTitle>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {radiusKeys.map((key) => (
          <Input
            key={key}
            label={t(radiusLabelMap[key])}
            value={toNumber(radius[key])}
            onChange={(value) => {
              handleChange(key, value);
            }}
          />
        ))}
      </SimpleGrid>

      <Button
        variant="light"
        color="gray"
        leftSection={<RotateCcw />}
        onClick={handleReset}
      >
        {t('reset')}
      </Button>
    </Stack>
  );
};
