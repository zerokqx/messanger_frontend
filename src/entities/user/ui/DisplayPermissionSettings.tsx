import { useAuth } from '@/shared/model/authProviderContext';
import { Checkbox, Select, type ComboboxItem } from '@mantine/core';
import { map } from 'lodash';
import { memo, useMemo } from 'react';
import { useGetSettings } from '../lib';
import type { TUserState } from '../types/userStore.type';
import { useTranslation } from 'react-i18next';

export const DisplayPermissionSettings = memo(() => {
  const { t } = useTranslation('ns1');
  const settings = useGetSettings();
  const permissions = useAuth((s) => s.user.profile_permissions);
  const editPermission = useAuth((s) => s.user.editPermission);

  // Конфигурация для каждого поля
  const selectConfig = useMemo(() => {
    const everyoneContactsNobody: ComboboxItem[] = [
      { label: 'Все', value: '0' },
      { label: 'Контакты', value: '1' },
      { label: 'Никто', value: '2' },
    ];

    const hours = map([2, 8, 12, 24], (item) => ({
      label: t('hours', { count: item }),
      value: (item * 3600).toString(), // переводим в секунды
    }));

    const months = map([12, 24, 30], (month) => ({
      label: t('months', { count: month }),
      value: month.toString(),
    }));

    const days = map([1, 7, 14, 30, 60, 90, 180, 365], (day) => ({
      label: t('days', { count: day }),
      value: day.toString(),
    }));

    // Маппинг поля → данные для селекта
    return {
      last_seen_visibility: everyoneContactsNobody,
      public_invite_permission: everyoneContactsNobody,
      group_invite_permission: everyoneContactsNobody,
      call_permission: everyoneContactsNobody,
      max_message_auto_delete_seconds: hours,
      auto_delete_after_days: days,
    } as const;
  }, [t]);

  return settings.map(({ key, type, label }) => {
    const typedKey = key as keyof TUserState['profile_permissions'];

    if (type === 'checkbox') {
      return (
        <Checkbox
          label={label}
          checked={permissions[typedKey] as boolean}
          key={key}
          onChange={(e) => {
            editPermission({ [key]: e.target.checked });
          }}
        />
      );
    }

    // Проверяем, есть ли для этого поля данные селекта
    if (typedKey in selectConfig) {
      const data = selectConfig[typedKey as keyof typeof selectConfig];
      return (
        <Select
          st={{
            userSelect:'none'
          }}
          label={label}
          data={data}
          key={key}
          value={String(permissions[typedKey])}
          onChange={(value) => {
            editPermission({ [typedKey]: Number(value) });
          }}
        />
      );
    }

    return null;
  });
});
