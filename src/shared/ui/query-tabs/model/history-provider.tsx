import * as React from 'react';
import { TabsContext } from './history-context';

export type TabsReducerAction =
  | { type: 'PUSH'; value: string }
  | { type: 'BACK' }
  | { type: 'REPLACE'; value: string }
  | { type: 'RESET'; value: string }
  | { type: 'BATCH'; actions: TabsReducerAction[] };

export interface TabsState {
  current: string;
  history: string[];
}

export type TabsReducer = (state: TabsState, action: TabsReducerAction) => TabsState;

const reducer: TabsReducer = (state, action) => {
  switch (action.type) {
    case 'PUSH': {
      const { history, current } = state;
      if (current === action.value) return state;
      const newHistory = [...history, action.value];
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
      return { current: action.value, history: newHistory };
    }
    case 'RESET': {
      const { history, current } = state;
      if (current === action.value && history.length === 1) return state;
      return { current: action.value, history: [action.value] };
    }
    case 'BATCH': {
      return action.actions.reduce(reducer, state);
    }
    default: {
      // чтобы TS не ругался на unreachable, можно так:
      // const _exhaustive: never = action;
      throw new Error('Action not exists in reducer.');
    }
  }
};


const initialState: TabsState = {
  current: 'main',
  history: ['main'],
};

export function TabManagerProvider({
  children,
  initial = initialState,
}: {
  children: React.ReactNode;
  initial?: TabsState;
}) {
  const [state, dispatch] = React.useReducer(reducer, initial);
  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  // eslint-disable-next-line react-x/no-context-provider
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

