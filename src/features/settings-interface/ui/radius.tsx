import { useSettingsStore, type Radius } from '@/shared/lib/settings';
import { Button, NumberInput, SimpleGrid } from '@mantine/core';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TextTitle } from './text-title';
import { RadiusSchema } from '@/shared/lib/settings/settings/model/types';
import { RoundedContainerStack } from '@/shared/ui/boxes';
import { NamedList } from '@/shared/ui/named-list';

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
    <NamedList title={t('radius')} bdrs={0}>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {radiusKeys.map((key) => (
          <Input
            variant="default"
            key={key}
            label={key}
            value={toNumber(radius[key])}
            onChange={(value) => {
              handleChange(key, value);
            }}
          />
        ))}
      </SimpleGrid>

      <Button
        variant="subtle"
        leftSection={<RotateCcw />}
        onClick={handleReset}
      >
        {t('reset')}
      </Button>
    </NamedList>
  );
};
