import { type Dispatch } from 'react';
import { createReducerContext } from 'react-use';

export type TabReducerActions =
  | { type: 'PUSH'; value: string }
  | { type: 'BACK' }
  | { type: 'REPLACE'; value: string }
  | { type: 'RESET'; value: string };
export interface TabContext {
  current: string;
  history: string[];
}

export type TabManagerReducer = (
  state: TabContext,
  action: TabReducerActions
) => TabContext;
const reducer: TabManagerReducer = (state, action) => {
  switch (action.type) {
    case 'PUSH': {
      if (state.current === action.value) return state;
      const newHistory = [...state.history, action.value];
      return { history: newHistory, current: action.value };
    }
    case 'BACK': {
      if (state.history.length <= 1) return state;
      const newHistory = state.history.slice(0, -1);
      const newCurrent = newHistory[newHistory.length - 1] ?? state.current;
      return { history: newHistory, current: newCurrent };
    }
    case 'REPLACE': {
      if (state.current === action.value) return state;
      const newHistory = [...state.history.slice(0, -1), action.value];
      return { current: action.value, history: newHistory };
    }

    case 'RESET': {
      return { current: action.value, history: [action.value] };
    }
    default: {
      throw new Error(`Action not exists in reducer.`);
    }
  }
};

const [useTabManagerIternal, TabManagerProvider] = createReducerContext(
  reducer,
  {
    current: 'main',
    history: ['main'],
  }
);
const useTabManager = (): [TabContext, Dispatch<TabReducerActions>] => {
  const [state, dispatch] = useTabManagerIternal();
  return [state, dispatch as Dispatch<TabReducerActions>] as const;
};
export { useTabManager, TabManagerProvider };
