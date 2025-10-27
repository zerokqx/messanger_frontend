import { Tabs } from '@mantine/core';
import { motion } from 'motion/react';
import { CustomMantineButton } from '../../Button';
import { If } from '../../If';
import type {
  ControlTaber,
  TaberProps,
  TaberTemplate,
  TaberTemplateReturn,
  Windows,
} from '../types';
import { createTabStore } from '../model';
import type { UseControllerTaber } from '../types/useControllerTaber.type';

/**
 * `createTaber` - это функция-фабрика (Higher-Order Component - HOC),
 * предназначенная для создания системы вкладок, основанной на компонентах `Tabs` из библиотеки `@mantine/core`.
 * Она предоставляет гибкий механизм для управления состоянием активной вкладки и рендеринга содержимого вкладок.
 *
 * @template T - Тип кортежа `Windows`, определяющий доступные вкладки.
 * @template Items - Тип отдельных элементов из `T`, представляющий идентификатор вкладки.
 *
 * @param {TaberProps<T, Items>} { windows, store } - Объект конфигурации.
 * @param {T} windows - Массив строк (кортеж), определяющий уникальные идентификаторы для каждой вкладки.
 * @param {CreateTabStore<Items>} store - Объект хранилища состояния, который должен соответствовать интерфейсу `CreateTabStore`.
 *   Используется для управления текущей активной вкладкой.
 *
 * @returns {[ControlTaber<Items>, TaberTemplate<T>]} Кортеж, содержащий:
 *   - `controlTaber`: Объект для программного управления вкладками.
 *   - `Taber`: React-компонент для декларативного определения структуры вкладок.
 *
 * @example
 * ```typescript
 * import { createTaber } from 'shared/ui/Tabs';
 * import { useTabStore } from './model/useTabStore'; // Пример использования вашего хранилища
 * import { Tabs } from '@mantine/core'; // Импортируем Tabs из Mantine
 * type MyWindows = ['general', 'security', 'notifications'];
 *
 * const [taberControl, Taber] = createTaber<MyWindows, MyWindows[number]>({
 *   windows: ['general', 'security', 'notifications'],
 *   store: useTabStore(), // Ваше хранилище состояния вкладок
 * });
 *
 * function MyComponent() {
 *   return (
 *     <Taber>
 *       <Taber.Panel value="general">
 *       </Taber.Panel>
 *       <Taber.Panel value="security">
 *       </Taber.Panel>
 *       <Taber.Panel value="notifications">
 *       </Taber.Panel>
 *     </Taber>
 *   );
 * }
 * ```
 */
export const createTaber = <T extends Windows>({
  windows,
  initial,
}: TaberProps<T>): TaberTemplateReturn<T> => {
  const useStore = createTabStore<T[number]>(initial);
  const mapIndex = windows.map((_, index) => index);
  const useControllerTaber: UseControllerTaber<T> = () => {
    const currentTab = useStore.useCurrentTab();
    const setCurrentTab = useStore.useSetCurrentTab();
    const controlTaber: ControlTaber<T[number]> = {
      indexes: mapIndex,
      get currentIndex() {
        return windows.indexOf(currentTab as Lowercase<string>);
      },
      length: mapIndex.length,
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.length;
        setCurrentTab(windows[this.currentIndex] as T[number]);
      },
      prev() {
        this.currentIndex = (this.currentIndex - 1 + this.length) % this.length;
        setCurrentTab(windows[this.currentIndex] as T[number]);
      },
      set(key) {
        setCurrentTab(key);
      },
    };
    return controlTaber;
  };

  const AnimatedPanel = motion.create(Tabs.Panel);
  const Panel: TaberTemplate<T>['Panel'] = ({ children, value }) => {
    return (
      <AnimatedPanel
        keepMounted
        key={value}
        initial={{
          scale: 0,
        }}
        animate={{ scale: [0, 1] }}
        value={value}
      >
        {children}
      </AnimatedPanel>
    );
  };

  const GoToButton: TaberTemplate<T>['GoToButton'] = ({ label, resetTo }) => {
    const setCurrentTab = useStore.useSetCurrentTab();

    return (
      <CustomMantineButton
        onClick={() => {
          setCurrentTab(resetTo);
        }}
      >
        {label ?? 'Reset'}
      </CustomMantineButton>
    );
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
    return (
      <Tabs value={currentTab} keepMounted={false}>
        {children}
      </Tabs>
    );
  };

  Taber.OnlyOnTab = OnlyOnTab;
  Taber.GoToButton = GoToButton;
  Taber.Panel = Panel;

  return [Taber, useStore, useControllerTaber];
};
