import { Tabs } from '@mantine/core';
import type {
  Windows,
  TaberProps,
  ControlTaber,
  TaberTemplate,
} from '../types';

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
export const createTaber = <T extends Windows, Items extends T[number]>({
  windows,
  store,
}: TaberProps<T, Items>): [ControlTaber<Items>, TaberTemplate<T>] => {
  const mapIndex = windows.map((_, index) => index);
  const { currentTab, setCurrentTab } = store;

  const controlTaber: ControlTaber<Items> = {
    indexes: mapIndex,
    get currentIndex() {
      return windows.indexOf(store.currentTab as Lowercase<string>);
    },
    length: mapIndex.length,
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.length;
      setCurrentTab(windows[this.currentIndex] as Items);
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.length) % this.length;
      setCurrentTab(windows[this.currentIndex] as Items);
    },
    set(key) {
      setCurrentTab(key);
    },
  };

  const Panel: TaberTemplate<T>['Panel'] = ({ children, value }) => {
    return <Tabs.Panel value={value}>{children}</Tabs.Panel>;
  };

  const Taber: TaberTemplate<T> = ({ children }) => (
    <Tabs value={currentTab}>{children}</Tabs>
  );
  Taber.Panel = Panel;

  return [controlTaber, Taber];
};
