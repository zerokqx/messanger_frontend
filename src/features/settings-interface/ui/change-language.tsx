import { Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { languages } from '../config/languages';
import { LanguageSchema } from '../model/language-validation';

export const ChangeLanguage = () => {
  const [t, i18n] = useTranslation('settings-tab');

  return (
    <Select
      label={t('language-select')}
      value={LanguageSchema.safeParse(i18n.language).data ?? null}
      data={languages}
      allowDeselect={false}
      onChange={(v) => {
        const parsedValue = LanguageSchema.safeParse(v);
        if (parsedValue.success) {
          void i18n.changeLanguage(parsedValue.data);
        }
      }}
    />
  );
};
