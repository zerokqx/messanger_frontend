import { createReducerContext } from 'react-use';

export type TabsReducerAction =
  | { type: 'PUSH'; value: string }
  | { type: 'BACK' }
  | { type: 'REPLACE'; value: string }
  | { type: 'RESET'; value: string }
  | { type: 'BATCH'; actions: TabsReducerAction[] };
export interface TabsContext {
  current: string;
  history: string[];
}

export type TabsReducer = (
  state: TabsContext,
  action: TabsReducerAction
) => TabsContext;
const reducer: TabsReducer = (state, action) => {
  switch (action.type) {
    case 'PUSH': {
      const { history, current } = state;
      if (current === action.value) return state;
      const newHistory = [...history, action.value];

      performance.mark('tab-start');
      return { history: newHistory, current: action.value };
    }
    case 'BACK': {
      const { history, current } = state;
      if (history.length <= 1) return state;
      const newHistory = history.slice(0, -1);
      const newCurrent = newHistory[newHistory.length - 1] ?? current;
      return { history: newHistory, current: newCurrent };
    }
    case 'REPLACE': {
      const { history, current } = state;
      if (current === action.value) return state;
      const newHistory = [...history.slice(0, -1), action.value];

      console.log('REPLACE NEW');
      return { current: action.value, history: newHistory };
    }

    case 'RESET': {
      const { history, current } = state;
      if (current === action.value && history.length === 1) return state;
      console.log('RESET NEW');
      return { current: action.value, history: [action.value] };
    }
    case 'BATCH': {
      let __state = state;
      action.actions.forEach((a) => (__state = reducer(__state, a)));
      return __state === state ? state : __state;
    }
    default: {
      throw new Error(`Action not exists in reducer.`);
    }
  }
};

export const [useTabManagerIternal, TabManagerProvider] = createReducerContext(
  reducer,
  {
    current: 'main',
    history: ['main'],
  }
);
