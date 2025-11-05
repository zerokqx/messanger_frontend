/**
 * Интерфейс, описывающий состояние хранилища вкладок.
 * @template T - Тип идентификатора вкладки (строка).
 */
export interface CreateTabStoreState<T extends string> {
  /** Текущая активная вкладка. */
  currentTab: T;
  /** История переходов (включая текущую). */
  history: T[];
}

/**
 * Интерфейс, описывающий действия (actions) хранилища вкладок.
 * @template T - Тип идентификатора вкладки (строка).
 */
export interface CreateTabStoreActions<T extends string> {
  /**
   * Устанавливает текущую активную вкладку (добавляет в историю).
   * @param tab - Идентификатор вкладки.
   */
  setCurrentTab: (tab: T) => void;
  /**
   * Возвращает к предыдущей вкладке (удаляет текущую из истории).
   */
  goBack: () => void;
  /** Сбрасывает состояние к начальной вкладке. */
  reset: () => void;
}

/**
 * Объединенный тип для хранилища вкладок.
 * @template T - Тип идентификатора вкладки.
 */
export type CreateTabStore<T extends string = string> = CreateTabStoreState<T> &
  CreateTabStoreActions<T>;
