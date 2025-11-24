import type { ReactNode, RefObject } from 'react';
import type { CreateTabStoreFunction } from '../model/createTabStore';
import type { UseControllerTaber } from './useControllerTaber.type';
import type { TaberButtons } from './taberButton.type';
import type { MotionProps } from 'motion/react';
import type { Tabs, TabsProps } from '@mantine/core';
import type { PanelBottom } from 'lucide-react';

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
export interface TaberProps<T extends Windows> {
  /**
   * Массив строк (кортеж), определяющий уникальные идентификаторы для каждой вкладки.
   * Эти идентификаторы используются как `value` для `Tabs.Tab` и `Taber.Panel`.
   */
  windows: T;
  initial: T[number];
  /**
   * Объект хранилища состояния, который должен соответствовать интерфейсу `CreateTabStore`.
   * Используется для управления текущей акт��вной вкладкой.
   */
}

/**
 * Интерфейс для объекта, возвращаемого `createTaber` для программного управления вкладками.
 * @template T - Тип идентификатора вкладки (один из элементов `Windows`).
 */
export interface ControlTaber<T extends string> {
  mainPage: () => { index: number; name: string };
  /** Текущий индекс активной вкладки в массиве windows. */
  currentIndex: number;
  /** Индекс предыдущей вкладки (для удобства). */
  prev: number;
  /** Индекс следующей вкладки (для удобства). */
  next: number;
  /** Переключает на следующую вкладку по кругу. */
  goNext: () => void;
  /** Переключает на предыдущую вкладку по кругу. */
  goPrev: () => void;
  /**
   * Устанавливает активную вкладку по ее идентификатору (key).
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
interface TaberComponentProps<T extends Windows> extends MotionProps {
  animationVariant?: 'top-down' | 'down-top' | 'right-left' | 'left-right';
  autoSet?: boolean;
  /** Дочерние элементы, которые будут отображены внутри панели вкладки. */
  children: ReactNode;
  /**
   * Значение, соответствующее идентификатору вкладки. Должно совпадать с одним из элементов `windows`.
   */
  value: T[number];
  keepMounetd?: boolean;
}

export interface TaberOnlyOnTabProp<T extends Windows> {
  on: T[number];
  children: ReactNode;
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
  /**
   * @description Кнопка для переключеня вкладок декларативно
   * @param props
   * @returns Button
   */
  OnlyOnTab: (props: TaberOnlyOnTabProp<T>) => ReactNode;
}

export type TaberTemplateReturn<T extends Windows> = [
  TaberTemplate<T>,
  ReturnType<CreateTabStoreFunction<T[number]>>,
  TaberButtons<T>,
  () => T[0],
];
