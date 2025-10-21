// Все модалки
interface UseModalGlobalState {
  login: boolean;
  register: boolean;
  password: boolean;
  settings: boolean;
}

// All actions
type ActionWithKey = 'open' | 'toggle' | 'close';
// Pin экшен это экшен который закрепляеться на определеный ключ с определеным экшеном
// Это позволяет избавиться от низко уровневых API.
type ActionWithPin = `pin${Capitalize<ActionWithKey>}`;

// Все экшены.
// Методы с _ не надо использовать снаружи в этом нет необходимости
interface UseModalGlobalAction<
  Keys extends keyof UseModalGlobalState = keyof UseModalGlobalState,
  ActionViaKey extends (key: Keys) => void = (key: Keys) => void,
  Pin extends (key: Keys) => () => void = (key: Keys) => () => void,
> extends Record<ActionWithKey, ActionViaKey>,
    Record<ActionWithPin, Pin> {
  _isKeyExist: (key: Keys) => boolean;
  _createPin: (keyState: Keys, keyAction: ActionWithKey) => () => void;
}
// Ключи всех модалок
export type AllModals = keyof UseModalGlobalState;
// Главный стейт с состоянием и экшенами
export type UseModalGlobal = UseModalGlobalAction & UseModalGlobalState;
