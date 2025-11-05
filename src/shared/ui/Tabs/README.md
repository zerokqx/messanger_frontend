## `createTaber` HOC

`createTaber` - это функция-фабрика (Higher-Order Component - HOC), предназначенная для создания системы вкладок, основанной на компонентах `Tabs` из библиотеки `@mantine/core`. Она предоставляет гибкий механизм для управления состоянием активной вкладки и рендеринга содержимого вкладок.

### Использование

`createTaber` принимает объект конфигурации `TaberProps` и возвращает кортеж, содержащий объект `controlTaber` для программного управления вкладками и компонент `Taber` для декларативного определения структуры вкладок.

```typescript
import { createTaber } from 'shared/ui/Tabs';
import { useTabStore } from './model/useTabStore'; // Пример использования вашего хранилища

// Определите ваши окна/вкладки
type MyWindows = ['general', 'security', 'notifications'];

const [taberControl, Taber] = createTaber<MyWindows, MyWindows[number]>({
  windows: ['general', 'security', 'notifications'],
  store: useTabStore(), // Ваше хранилище состояния вкладок
});

function MyComponent() {
  return (
    <Taber>
      <Tabs.List>
        <Tabs.Tab value="general">Общие</Tabs.Tab>
        <Tabs.Tab value="security">Безопасность</Tabs.Tab>
        <Tabs.Tab value="notifications">Уведомления</Tabs.Tab>
      </Tabs.List>

      <Taber.Panel value="general">
        {/* Содержимое для вкладки "Общие" */}
      </Taber.Panel>
      <Taber.Panel value="security">
        {/* Содержимое для вкладки "Безопасность" */}
      </Taber.Panel>
      <Taber.Panel value="notifications">
        {/* Содержимое для вкладки "Уведомления" */}
      </Taber.Panel>
    </Taber>
  );
}
```

### Параметры `createTaber`

Функция `createTaber` принимает один аргумент - объект `TaberProps`:

-   `windows`: `T extends Windows`
    Массив строк (кортеж), определяющий уникальные идентификаторы для каждой вкладки. Эти идентификаторы используются как `value` для `Tabs.Tab` и `Taber.Panel`. Тип `Windows` гарантирует, что это массив строк в нижнем регистре.
    Пример: `['general', 'security']`

-   `store`: `CreateTabStore<Items>`
    Объект хранилища состояния, который должен соответствовать интерфейсу `CreateTabStore`. Он используется для управления текущей активной вкладкой. Ожидается, что объект `store` будет иметь свойства `currentTab` (текущая активная вкладка) и `setCurrentTab` (функция для установки активной вкладки).

### Возвращаемое значение

`createTaber` возвращает кортеж: `[controlTaber, Taber]`.

1.  `controlTaber`: `ControlTaber<Items>`
    Объект, предоставляющий программный интерфейс для управления вкладками:
    -   `indexes`: `number[]` - Массив индексов, ��оответствующих `windows`.
    -   `currentIndex`: `number` - Текущий индекс активной вкладки в массиве `windows`.
    -   `length`: `number` - Общее количество вкладок.
    -   `next()`: `() => void` - Переключает на следующую вкладку по кругу.
    -   `prev()`: `() => void` - Переключает на предыдущую вкладку по кругу.
    -   `set(key: Items)`: `(key: Items) => void` - Устанавливает активную вкладку по ее идентификатору (`key`).

2.  `Taber`: `TaberTemplate<T>`
    React-компонент, который оборачивает содержимое вкладок. Он использует `Tabs` из `@mantine/core` и автоматически связывает `value` с состоянием `currentTab` из `store`.
    -   `Taber.Panel`: Вложенный компонент, который должен использоваться для определения содержимого каждой вкладки. Принимает пропс `value`, который должен соответствовать одному из идентификаторов, определенных в `windows`.

### Типы

-   `Windows`: `[Lowercase<string>, ...Lowercase<string>[]];`
    Тип, представляющий кортеж строк в нижнем регистре, используемый для определения доступных вкладок.

-   `TaberProps<T extends Windows, Items extends T[number]>`:
    Интерфейс для пропсов, передаваемых в `createTaber`.

-   `ControlTaber<T extends Windows[number]>`:
    Интерфейс для объекта, возвращаемого `createTaber` для управления вкладками.

-   `CreateTabStore<T extends string = string>`:
    Интерфейс для объекта хранилища состояния, который должен быть передан в `createTaber`. Он включает `currentTab`, `prevTab` и методы `setCurrentTab`, `reset`.

### Зависимости

-   `@mantine/core`: Используется компонент `Tabs` для базовой функциональности вкладок.

### Примечания

-   Для управления состоянием вкладок рекомендуется использовать внешнее хранилище (например, Zustand, Redux) и передавать его в `createTaber` через пропс `store`.
-   Идентификаторы вкладок (`windows`) должны быть уникальными и использоваться последовательно для `Tabs.Tab` и `Taber.Panel`.
