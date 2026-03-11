import { useReducer } from 'react';
import type { AchievementBadgeType } from './types';

interface AchievementsGridState {
  isScrolling: boolean;
  page: number;
  selectedGrades: AchievementBadgeType[];
  search: string;
  showCompleted: boolean;
  showInProgress: boolean;
}

type AchievementsGridAction =
  | { type: 'SET_SCROLLING'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_GRADES'; payload: AchievementBadgeType[] }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SHOW_COMPLETED'; payload: boolean }
  | { type: 'SET_SHOW_IN_PROGRESS'; payload: boolean }
  | { type: 'RESET_FILTERS' };

const initialState: AchievementsGridState = {
  isScrolling: false,
  page: 1,
  selectedGrades: [],
  search: '',
  showCompleted: true,
  showInProgress: true,
};

const reducer = (
  state: AchievementsGridState,
  action: AchievementsGridAction
): AchievementsGridState => {
  switch (action.type) {
    case 'SET_SCROLLING':
      return { ...state, isScrolling: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_GRADES':
      return { ...state, selectedGrades: action.payload, page: 1 };
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 };
    case 'SET_SHOW_COMPLETED':
      return { ...state, showCompleted: action.payload, page: 1 };
    case 'SET_SHOW_IN_PROGRESS':
      return { ...state, showInProgress: action.payload, page: 1 };
    case 'RESET_FILTERS':
      return {
        ...state,
        page: 1,
        search: '',
        selectedGrades: [],
        showCompleted: true,
        showInProgress: true,
      };
    default:
      return state;
  }
};

export const useAchievementsGridState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    setScrolling: (value: boolean) => {
      dispatch({ type: 'SET_SCROLLING', payload: value });
    },
    setPage: (value: number) => {
      dispatch({ type: 'SET_PAGE', payload: value });
    },
    setSelectedGrades: (value: AchievementBadgeType[]) => {
      dispatch({ type: 'SET_GRADES', payload: value });
    },
    setSearch: (value: string) => {
      dispatch({ type: 'SET_SEARCH', payload: value });
    },
    setShowCompleted: (value: boolean) => {
      dispatch({ type: 'SET_SHOW_COMPLETED', payload: value });
    },
    setShowInProgress: (value: boolean) => {
      dispatch({ type: 'SET_SHOW_IN_PROGRESS', payload: value });
    },
    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' });
    },
  };
};
