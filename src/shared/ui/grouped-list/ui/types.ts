import type { GroupProps, MantineColor, StackProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { ExclusifyUnion } from 'type-fest';

export interface GroupedListProps extends StackProps {
  children?: ReactNode[];
}

type BaseGroupedItemProps = GroupProps & {
  leftSectionColor?: MantineColor;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  isText?: boolean;
  label?: string;
};

// 2. Описываем два конкретных режима
interface HideMode {
  /** Если true, компонент просто не отрендерится при отсутствии данных */
  hideUndefined: true;
  fallback?: never;
  undefinedStyles?: never;
}

interface FallbackMode {
  hideUndefined?: false;
  /** Что показать, если данных нет */
  fallback?: ReactNode;
  /** Применять ли стили для "пустого" состояния */
  undefinedStyles?: boolean;
}

// 3. Соединяем: База & (Режим А | Режим Б)
export type GroupedItemProps = BaseGroupedItemProps & (HideMode | FallbackMode);

// Пример использования в интерфейсе компонента
export interface GroupedListComponent {
  (props: GroupedListProps): ReactNode;
  Item: (props: GroupedItemProps) => ReactNode;
}
