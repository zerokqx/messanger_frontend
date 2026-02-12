import { Box, Button, Stack, Tabs } from '@mantine/core';
import { motion } from 'motion/react';
import { createTabStore } from '../model';
import type {
  TaberProps,
  TaberTemplate,
  TaberTemplateReturn,
  Windows,
} from '../types';
import type { TaberButtons } from '../types/taber-button.type';
import { memo } from 'react';

/**
 *
 * `createTaber` — фабричная функция для создания системы вкладок на базе `@mantine/core/Tabs`.
 *
 * Позволяет управлять активной вкладкой, переключаться между ними и использовать анимацию при смене.
 *
 * @template T - Кортеж строк `windows`, обозначающих идентификаторы вкладок.
 *
 * @param {TaberProps<T>} config - Объект с:
 *   - `windows`: кортеж вкладок (например, ['main', 'settings', 'about'])
 *   - `initial`: стартовая вкладка
 *
 * @returns `[Taber, store, controller, buttons]`:
 *   - `Taber` — компонент для декларативного описания вкладок.
 *   - `store` — хранилище состояния текущей вкладки.
 *   - `controller` — объект с методами `next`, `prev`, `set`.
 *   - `buttons` — готовые кнопки `GoTo` и `Reset`.
 *
 * Визуально `windows` можно представить как "линию" окон:
 * первое окно (`windows[0]`) — главное.
 * Кнопка `Reset` всегда возвращает на это главное окно.
 */
export const createTaber = <T extends Windows>({
  windows,
  initial,
}: TaberProps<T>): TaberTemplateReturn<T> => {
  const useStore = createTabStore<T[number]>(initial);
  const Panel: TaberTemplate<T>['Panel'] = ({ children, value, ...props }) => {
    return (
      <Tabs.Panel
        h={'100%'}
        component={motion.div}
        key={value}
        value={value}
        {...props}
      >
        <Box
          initial={{
            x: '-5%',
          }}
          whileInView={{
            x: '0%',
          }}
          component={motion.div}
          h={'100%'}
        >
          <Stack h={'100%'}>{children}</Stack>
        </Box>
      </Tabs.Panel>
    );
  };
  const GoToButton: TaberButtons<T>['GoTo'] = ({ children, resetTo }) => {
    const setCurrentTab = useStore.useSetCurrentTab();

    return (
      <Button
        onClick={() => {
          setCurrentTab(resetTo);
        }}
        children={children}
      />
    );
  };
  const ResetButton: TaberButtons<T>['Reset'] = ({ children }) => {
    const reset = useStore.useReset();
    return <Button onClick={reset} children={children} />;
  };
  const Buttons: TaberButtons<T> = {
    GoTo: GoToButton,
    Reset: ResetButton,
  };

  const OnlyOnTab: TaberTemplate<T>['OnlyOnTab'] = ({ on, children }) => {
    const currentTab = useStore.useCurrentTab();
    return on === currentTab && children;
  };

  const Taber: TaberTemplate<T> = ({ children }) => {
    const currentTab = useStore.useCurrentTab();
    return (
      <Tabs keepMounted={false} h={'100%'} value={currentTab}>
        {children}
      </Tabs>
    );
  };

  Taber.OnlyOnTab = OnlyOnTab;
  Taber.Panel = memo(Panel);

  return [Taber, useStore, Buttons, () => windows[0], () => windows];
};
