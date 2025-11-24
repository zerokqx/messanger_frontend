import { Button, Stack, Tabs } from '@mantine/core';
import { motion } from 'motion/react';
import { If } from '../../If';
import { createTabStore } from '../model';
import type {
  TaberProps,
  TaberTemplate,
  TaberTemplateReturn,
  Windows,
} from '../types';
import type { TaberButtons } from '../types/taberButton.type';

/**
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
 
  const AnimatedPanel = motion.create(Tabs.Panel);
  const Panel: TaberTemplate<T>['Panel'] = ({ children, value, ...props }) => {
    return (
      <AnimatedPanel
        key={value}
        h={'100%'}
        initial={{
          x: '-5%',
        }}
        whileInView={{
          x: '0%',
        }}
        value={value}
        {...props}
      >
        <Stack>{children}</Stack>
      </AnimatedPanel>
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
    return (
      <If operandFirst={on} operandSecond={currentTab}>
        {children}
      </If>
    );
  };

  const Taber: TaberTemplate<T> = ({ children }) => {
    const currentTab = useStore.useCurrentTab();
    return (
      <Tabs keepMounted value={currentTab}>
        {children}
      </Tabs>
    );
  };

  Taber.OnlyOnTab = OnlyOnTab;
  Taber.Panel = Panel;

  return [Taber, useStore, Buttons, () => windows[0]];
};
