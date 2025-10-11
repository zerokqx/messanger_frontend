import { LoginForm } from '@/features/login';
import { RegisterForm } from '@/features/register';
import type { TabsConfig } from '../types/tabsConfig.type';

export const tabsConfig: TabsConfig<'Логин' | 'Регистрация'> = {
  list: [
    {
      value: 'Логин',
      text: 'Логин',
    },
    {
      value: 'Регистрация',
      text: 'Регистрация',
    },
  ],
  panels: [
    {
      value: 'Логин',
      render: () => LoginForm,
    },

    {
      value: 'Регистрация',
      render: () => RegisterForm,
    },
  ],
};
