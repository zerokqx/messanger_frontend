import type { ReactNode } from 'react';
import type { CreateTabStore } from './createTabStore.type';

/**
 * Тип, представляющий кортеж строк в нижнем регистре, исользуемый для определения доступных вкладок.
 * Каждая строка является уникальным идентификатором вкладки.
 * @example
 * type MyWindows = ['general', 'security', 'notifications'];
 */
export type Windows = [Lowercase<string>, ...Lowercase<string>[]];

/**
 * Интерфейс для пропсов, передаваемых в функцию `createTaber`.
 * @template T - Тип кортежа `Windows`, определяющий доступные вкладки.
 * @template Items - Тип отдельных элементов из `T`, представляющий идентификатор вкладки.
 */
export interface TaberProps<T extends Windows, Items extends T[number]> {
  /**
   * Массив строк (кортеж), определяющий уникальные идентификаторы для каждой вкладки.
   * Эти идентификаторы используются как `value` для `Tabs.Tab` и `Taber.Panel`.
   */
  windows: T;
  /**
   * Объект хранилища состояния, который должен соответствовать интерфейсу `CreateTabStore`.
   * Используется для управления текущей акт��вной вкладкой.
   */
  store: CreateTabStore<Items>;
}

/**
 * Интерфейс для объекта, возвращаемого `createTaber` для программного управления вкладками.
 * @template T - Тип идентификатора вкладки (один из элементов `Windows`).
 */
export interface ControlTaber<T extends Windows[number]> {
  /** Массив индексов, соответствующих `windows`. */
  indexes: number[];
  /** Текущий индекс активной вкладки в массиве `windows`. */
  currentIndex: number;
  /** Общее количество вкладок. */
  length: number;
  /** Переключает на следующую вкладку по кругу. */
  next: () => void;
  /** Переключает на предыдущую вкладку по кругу. */
  prev: () => void;
  /**
   * Устанавливает активную вкладку по ее идентификатору (`key`).
   * @param key - Идентификатор вкладки, которую нужно сделать активной.
   */
  set: (key: T) => void;
}

/**
 * Пропсы для основного компонента `Taber`.
 */
interface TaberTemplateProp {
  /** Дочерние элементы, которые будут отображены внутри компонента `Taber`. */
  children: ReactNode;
}

/**
 * Пропсы для вложенного компонента `Taber.Panel`.
 * @template T - Тип кортежа `Windows`, определяющий доступные вкладки.
 */
interface TaberComponentProps<T extends Windows> {
  /** Дочерние элементы, которые будут отображены внутри панели вкладки. */
  children: ReactNode;
  /**
   * Значение, соответствующее идентификатору вкладки. Должно совпадать с одним из элементов `windows`.
   */
  value: T[number];
}

/**
 * Интерфейс для возвращаемого компонента `Taber` и его вложенных компонентов.
 * @template T - Тип кортежа `Windows`, определяющий доступные вкладки.
 */
export interface TaberTemplate<T extends Windows> {
  /**
   * Основной компонент `Taber`, который оборачивает содержимое вкладок.
   * @param props - Пропсы компонента.
   */
  (props: TaberTemplateProp): ReactNode;
  /**
   * ��ложенный компонент `Panel`, который должен использоваться для определения содержимого каждой вкладки.
   */
  Panel: (props: TaberComponentProps<T>) => ReactNode;
}
