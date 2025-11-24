# Правила контрибьюции

## 1. Общие правила

- Используйте `const` вместо `let` по умолчанию. `let` используйте только тогда, когда переменная действительно должна быть переназначена.
- Пишите чистый, читаемый и само документируемый код.
- Следуйте принципам DRY (Don't Repeat Yourself).

## 2. Архитектура FSD (Feature-Sliced Design)

Проект использует архитектуру FSD. Пожалуйста, придерживайтесь следующих принципов:

- **Слои:** Соблюдайте правила взаимодействия между слоями (app, pages, widgets, features, entities, shared).
- **Слайсы:** Каждый модуль (слайс) должен быть независимым и иметь четко определенную ответственность.
- **Импорты:** Импорты должны быть направлены только вниз (от более высоких слоев к более низким).

## 3. Правила наименования

### Переменные и функции

- Используйте `camelCase` для переменных, функций и методов.
  ```typescript
  const myVariableName = 'value';
  function calculateSum() {
    /* ... */
  }
  ```

- Используйте `useCS` префикс для хуков которые взаимодействуют с `N` стором и берут данные из `A` параметра.
Sumary: Хуки которые синхранизируют данные из источника со сотором называються коннекторы.
### Компоненты

- Используйте `PascalCase` для React-компонентов.
  ```typescript
  function MyComponent() {
    /* ... */
  }
  ```

### Файлы и папки

- Используйте `camelCase` для названий файлов и папок.
  ```
  myFeature/
  ├── index.ts
  └── MyComponent.tsx
  ```
- Если папка для компонента то именуем ее тоже в `camelCase`

### Типы (TypeScript)

К типам добавляем суффиксы, описывающие их назначение:

- `Type`: Обычный тип, описывающий что-то одно (например, `UserType`).
- `Prop`: Тип, описывающий структуру пропсов для компонента (например, `ButtonProp`).
- `Store`: Тип, описывающий структуру стора `state-manager` (например, `UserStore`).
- `Compound`: Тип для паттерна React-Compound-Component (например, `TabsCompound`).

Пример:

```typescript
type SuffixType = 'Type' | 'Prop' | 'Store' | 'Compound';
type TypeName = `${string}${SuffixType}`;

// Примеры использования
type UserType = {
  id: string;
  name: string;
};

type ButtonProp = {
  onClick: () => void;
  label: string;
};
```

## 4. Store Type

Для создания типа стора необходимо создать 2 типа, которые описывают `State` и `Action`.
Экспортировать из файла типов стора разрешено только `UnionType` между `State` и `Action`.

Пример:

```typescript
// src/entities/user/types/userStore.type.ts
export type UserState = {
  user: UserType | null;
  isLoading: boolean;
};

export type UserActions = {
  setUser: (user: UserType | null) => void;
  setLoading: (loading: boolean) => void;
};

export type UserStore = UserState & UserActions;
```

## 5. OpenAPI Types

Автоматически сгенерированные типы из OpenAPI находятся в `./src/shared/types/v{number}.d.ts`.
**Запрещено изменять эти файлы вручную.**
Если вам нужны дополнительные типы, выносите их в соответствующие `types` слайса.

## 6. Запросы к API

Для запросов к API используйте хуки `useQuery` или `useMutation` из `./src/shared/api/clients/`.
Эти клиенты уже настроены для работы с нашим API.

Пример:

```typescript
// src/features/login/api/useLogin.ts
import { authClient } from '@/shared/api';
export const useLogin = () => {
  const mutate = authClient()().useMutation(/**your request**/);
};
```

- В первом вызове клиента происходит передача `middleware`, второй вызов создание самого клиента.
  Исходники можно посмотреть в `@/shared/api/clients`

## 7. Git-коммиты

- Пишите осмысленные и краткие коммит-сообщения.
- Используйте императивный заголовок.
- Если коммит большой, добавьте более подробное описание в тело сообщения.
- Придерживайтесь следующего формата:

  ```
  (<type>: <short describe>):
  [optional body]
  ```

  Примеры типов: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`.

Спасибо за ваш вклад!
