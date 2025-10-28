import { Tabs } from '@mantine/core';
import { motion } from 'motion/react';
import { CustomMantineButton } from '../../Button';
import { If } from '../../If';
import type {
  TaberProps,
  TaberTemplate,
  TaberTemplateReturn,
  Windows,
} from '../types';
import { createTabStore } from '../model';
import type { UseControllerTaber } from '../types/useControllerTaber.type';
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
  const useControllerTaber: UseControllerTaber<T> = () => {
    const currentTab = useStore.useCurrentTab();
    const setCurrentTab = useStore.useSetCurrentTab();
    const length = windows.length;

    const currentIndex = windows.indexOf(currentTab);
    const prev = (currentIndex - 1 + length) % length;
    const next = (currentIndex + 1) % length;

    const goPrev = () => {
      setCurrentTab(windows[prev] as T[number]);
    };
    const goNext = () => {
      setCurrentTab(windows[next] as T[number]);
    };
    const set = (key: T[number]) => {
      setCurrentTab(key);
    };

    return { currentIndex, prev, next, goPrev, goNext, set };
  };

  const AnimatedPanel = motion.create(Tabs.Panel);
  const Panel: TaberTemplate<T>['Panel'] = ({ children, value }) => {
    return (
      <AnimatedPanel
        initial={{
          scale: 0,
        }}
        animate={{ scale: 1 }}
        value={value}
      >
        {children}
      </AnimatedPanel>
    );
  };

  const GoToButton: TaberButtons<T>['GoTo'] = ({ children, resetTo }) => {
    const setCurrentTab = useStore.useSetCurrentTab();

    return (
      <CustomMantineButton
        onClick={() => {
          setCurrentTab(resetTo);
        }}
        children={children}
      />
    );
  };
  const ResetButton: TaberButtons<T>['Reset'] = ({ children }) => {
    const setCurrentTab = useStore.useSetCurrentTab();
    return (
      <CustomMantineButton
        onClick={() => {
          setCurrentTab(windows[0]);
        }}
        children={children}
      />
    );
  };
  const Buttons: TaberButtons<T> = {
    GoTo: GoToButton,
    Reset: ResetButton,
  };
  const OnlyOnTab: TaberTemplate<T>['OnlyOnTab'] = ({ on, children }) => {
    const currentTab = useStore.useCurrentTab();
    return (
      <If<T[number]> operandFirst={on} operandSecond={currentTab}>
        {children}
      </If>
    );
  };

  const Taber: TaberTemplate<T> = ({ children }) => {
    const currentTab = useStore.useCurrentTab();
    return <Tabs value={currentTab}>{children}</Tabs>;
  };

  Taber.OnlyOnTab = OnlyOnTab;
  Taber.Panel = Panel;

  return [Taber, useStore, useControllerTaber, Buttons];
};
