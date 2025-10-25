/**
 * Интерфейс, описывающий состояние хранилища вкладок.
 * @template T - Тип идентификатора вкладки (строка).
 */
export interface CreateTabStoreState<T extends string> {
  /** Текущая активная вкладка. */
  currentTab: T;
  /** Предыдущая активная вкладка, или `null`, если ее не было. */
  prevTab: T | null;
}

/**
 * Интерфейс, описывающий действия (actions) хранилища вкладок.
 * @template T - Тип идентификатора вкладки (строка).
 */
export interface CreateTabStoreActions<T extends string> {
  /**
   * Устанавливает текущую активную вкладку.
   * @param tab - Идентификатор вкладки, которую нужно сделать активной.
   */
  setCurrentTab: (tab: T) => void;
  /** Сбрасывает состояние хранилища к начальным значениям. */
  reset: () => void;
}

/**
 * Объединенный тип для хранилища вкладок, включающий состояние и действия.
 * @template T - Тип идентификатора вкладки (строка). По умолчанию `string`.
 */
export type CreateTabStore<T extends string = string> = CreateTabStoreState<T> &
  CreateTabStoreActions<T>;
