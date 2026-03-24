# Архитектурная шпаргалка для агентов
- Стек: React 19 + TypeScript + Vite, алиас `@` → `src` (tsconfig.app.json). UI — Mantine (тема в `src/app/mantine/theme.ts`), анимации — `motion`, иконки — `lucide`. Серверное состояние — TanStack Query, клиентское — `@colorfy-software/zfy` (обертки в `src/shared/lib/zustand`), стили — Mantine + vanilla-extract (`src/shared/styles`), переводы — i18next (`src/shared/i18next`).
- Точка входа: `src/app/main.tsx` разворачивает Mantine, LazyMotion, React Query, i18n, ModalsProvider и `InnerApp` c RouterProvider. Сгенерированное дерево маршрутов — `src/app/route-tree.gen.ts` (не править вручную, обновляется tanstack router plugin).

## FSD-слои и правила
- `shared` — инфраструктура без знания домена: API-клиенты, мидлвары, сторы (token/layout/modal), хуки, базовые UI-примитивы. Не тянет код из верхних слоев.
- `entities` — доменные сущности (user, session, chat, contact): типы, сторы, запросы, мелкие UI. Можно брать `shared`, но не `features`.
- `features` — пользовательские сценарии/экшены (login, register, logout, refresh, search, edit-profile и т.п.). Комбинируют `entities` + `shared`.
- `widgets` — крупные блоки страницы (aside, navbar, side-bar, contact-list, модалки и т.д.). Собирают `features`/`entities`/`shared`.
- `pages` — маршрутные экраны (`pages/auth`, `pages/404`). Не содержат бизнес-логики, только композиция `widgets`/`features`.
- `app` — роутер (`src/app/routes`), провайдеры, тема, глобальные devtools. Зависимости только вниз.

## Роутинг
- Файл-базед маршруты в `src/app/routes`. Root (`__root.tsx`) подключает devtools и pending loader. `/` редиректит на `/y`.
- `/auth` — если уже авторизован (`useIsAuth.check()`), делает редирект на `/`. Внутри `AuthPage` лениво подключает модалки логина/регистрации.
- `/_authorized` — оборачивает страницы в Mantine `AppShell`, лениво подтягивает `side-bar`, `navbar`, `aside` и читает состояние лэйаута из `shared/lib/hooks/use-layout`.
- `/_authorized/y` — гард через `useCheckAuth.check()` (JWT в сторе). `loader` грузит текущего пользователя (`fetchMe` из `entities/user`) и инициализирует стор пользователя (`userAction.doInit`). `/_authorized/y/$uuid` валидирует `uuid` через zod.
- 404 — `pages/404`. Не найденные маршруты обрабатываются через `notFoundComponent` в root.

## Данные и API
- Типы OpenAPI живут в `src/shared/types/v1.d.ts`; клиентские хуки и схемы генерируются в `src/shared/api/orval`; обновление — `npm run openapi:generate`.
- Базовый URL собирается `createBaseUrl(service)` из `VITE_API_URL`; сервисы: auth/user/profile/feed/chat (`src/shared/api/base-url.ts`).
- HTTP-клиент для orval находится в `src/shared/api/axios-client.ts`; авторизация и refresh обрабатываются там через `tokenStore` и `/auth/token/refresh`.
- QueryClient создается в `src/shared/api/query-clinets.ts` (gcTime сутки). Персистер на localforage — `src/shared/api/storages/base.storage.ts` (подключайте при необходимости).
- Конкретные запросы/мутации лежат рядом с сущностью/фичей и используют orval-генерацию: напр. `entities/user/model/me.query.ts`, `features/login/api/use-login.ts`.

## Состояние
- ZFY (обертка над zustand) для клиентского стейта. Экшены собираются через `createStoreAction`, чтобы иметь именованные методы `doX`.
- Ключевые сторы: `shared/token` (persist через AsyncStorage, `tokenAction.doValidate/Set/Reset`, хелпер `useIsAuth`), `shared/lib/hooks/use-layout` (видимость aside/navbar и т.п.), `shared/model/use-modal-store` (глобальные модалки).
- Серверное состояние — TanStack Query (используйте `queryClient` из `shared/api`, в рантайме также доступен `window.__TANSTACK_QUERY_CLIENT__`).

## UI/UX и прочее
- Тема Mantine в `src/app/mantine/theme.ts` (dark-палитра, радиусы, кастомные компоненты). Глобальный стиль в `src/shared/styles/root.css.ts`.
- Общие UI-примитивы: `src/shared/ui` (inputs/forms, search, tabs, виртуальный список, theme-toggle и т.д.). Готовые блоки/aside/sidebar — в `src/widgets`.
- Локализация в `src/shared/i18next`, провайдер подключен в `main.tsx`.
- Генерируемый файл `route-tree.gen.ts` и i18next типы не править руками; обновление — через плагины/скрипты.

## Как вносить изменения
- Соблюдайте зависимость слоев: `shared → entities → features → widgets → pages → app`. Не тяните код вниз по иерархии.
- Для новых API используйте orval-хуки, `get...QueryOptions` и `get...QueryKey`, чтобы не дублировать конфиг запросов.
- Для guarded-страниц используйте `beforeLoad`/`loader` TanStack Router вместо эффектов в компонентах; редиректы делайте через `redirect({ throw: true, ... })`.
- В клиентском стейте предпочитайте `createStore` + `createStoreAction`; не мутируйте данные сторы напрямую из компонентов.

## Как создавать index.ts файлы для FSD
- В каждом сегменте слайса свой index.ts файл
- Сегментый index.ts файл включает в себя экспорты которые испльзуються в этом слайсе а также на публичном апи
- index.ts слайса включает экспорты из сегментов ({ui,lib,model,config}/index.ts) которые являються публичным апи.

## Правила работы с типами

### Общие принципы

- Интерфейсы и типы должны находиться максимально близко к месту использования
- Не создавать глобальные хранилища типов без необходимости (`types/`, `global-types/`, `@types/`)
- Предпочтение отдаётся небольшим и специализированным файлам типов
- Типы должны улучшать читаемость кода

---

### Запрещённая структура

Запрещено создавать отдельный сегмент `types` внутри слайсов.

Неправильно:

entities/user/types/
features/auth/types/
widgets/header/types/

Правильно:

entities/user/model/types.ts  
features/auth/model/types.ts  
widgets/header/ui/types.ts

---

### Типы компонентов (UI)

При определении типов для UI-компонентов:

- Типы размещаются в `ui/types.ts`
- Не смешивать большие блоки типов и код компонента
- Для пропсов использовать `interface`

Пример структуры:

widgets/button/ui/types.ts  
widgets/button/ui/Button.tsx

Пример импорта:

Button.tsx → импортирует типы из ./types

---

### Типы фич (features)

При определении типов для фич:

- Типы размещаются в `model/types.ts`
- Типы фич описывают бизнес-логику, а не UI

Пример структуры:

features/auth/model/types.ts  
features/auth/model/login.ts

---

### Когда необходимо разделять типы

Типы необходимо выносить в отдельные файлы если:

- В файле более ~4 интерфейсов / типов
- Типы логически можно сгруппировать
- Типы ухудшают читаемость

Плохой пример:

Component.tsx содержит множество интерфейсов и типов

Хороший пример:

Component.tsx → только логика  
ui/types.ts → только типы

---

### Interface vs Type

Использовать interface когда:

- Описываются пропсы компонентов
- Описываются структурированные объекты
- Нужен статичный контракт

Использовать type когда:

- Используются union-типы
- Используются utility-типы
- Используются композиции типов

Пример union-типа:

Theme = "light" | "dark"

---

### Архитектурные ограничения (FSD)

- Типы должны принадлежать своему слою (`entities`, `features`, `widgets`, `shared`)
- Владение типами определяется владельцем бизнес-логики
- Запрещено переносить типы в shared без явной причины повторного использования
- Типы не должны нарушать границы слоёв

---

### Сигналы неправильной структуры типов

Если наблюдается:

- Большое количество типов в одном файле
- Типы ухудшают читаемость
- Появляются папки `types`
- Типы разбросаны без структуры

→ необходимо реорганизовать определения типов
