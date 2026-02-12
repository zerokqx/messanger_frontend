import {
  useSettingsStore,
  type SettingsStoreState,
} from '@/features/settings-interface/model/settings-store';
import type Resources from '@/shared/i18next/types/resources';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { Select, Stack, type ComboboxItem } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const animations: (ComboboxItem & {
  value: SettingsStoreState['animations'];
  label: keyof Resources['settings'];
})[] = [
  {
    value: 'keyframes',
    label: 'keyframes',
  },
  {
    value: 'spring',
    label: 'spring',
  },
];
export const InterfaceEditTab = () => {
  const { t } = useTranslation('sideBar');
  const update = useSettingsStore((s) => s.update);
  const animation = useSettingsStore((s) => s.data.animations);

  return (
    <>
      <Stack w={'30%'}>
        <Select
          allowDeselect={false}
          onChange={(v) => {
            if (v)
              update(
                (s) => (s.animations = v as SettingsStoreState['animations'])
              );
          }}
          defaultValue={animation}
          data={animations.map((a) => ({
            value: a.value,
            label: t(a.label),
          }))}
        />
      </Stack>

      <ThemeToggle />
    </>
  );
};
