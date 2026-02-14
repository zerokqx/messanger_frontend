import {
  createContext,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
interface TabsHistoryContext {
  history: string[];
  push: (v: string) => void;
  back: () => void;
}

interface TabsValueContext {
  value: string;
  set: (v: string) => void;
  reset: () => void;
}

export const TabsHistory = createContext<TabsHistoryContext | null>(null);
export const TabsValue = createContext<TabsValueContext | null>(null);

export const useTabsHistory = () => {
  const context = use(TabsHistory);
  if (!context)
    return {
      history: [],
      back: () => undefined,
      push: () => undefined,
    } as TabsHistoryContext;
  return context;
};

export const useTabsContext = () => {
  const context = use(TabsValue);
  if (!context) throw new Error('Context tabs value is not defined.');
  return context;
};

export const TabsContextProvider = ({
  children,
  initialValue = '',
}: {
  children?: ReactNode;
  initialValue: string;
}) => {
  const [valueContext, setValue] = useState<string>(initialValue);
  const initialValueRef = useRef<string>(initialValue);
  const set: TabsValueContext['set'] = useCallback((v) => {
    setValue(() => v);
  }, []);
  const reset: TabsValueContext['reset'] = useCallback(() => {
    setValue(() => initialValueRef.current);
  }, []);
  const value: TabsValueContext = useMemo(
    () => ({
      value: valueContext,
      set,
      reset,
    }),
    [valueContext, set, reset]
  );

  return <TabsValue value={value}>{children}</TabsValue>;
};

export const TabsHistoryProvider = ({ children }: { children?: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);
  const push: TabsHistoryContext['push'] = useCallback((v) => {
    setHistory((prev) => [...prev, v]);
  }, []);
  const back: TabsHistoryContext['back'] = useCallback(() => {
    {
      setHistory((prev) => (prev[prev.length - 1] === v ? prev : [...prev, v]));
    }
  }, []);

  const value = useMemo<TabsHistoryContext>(
    () => ({
      back,
      push,
      history,
    }),
    [back, push, history]
  );
  return <TabsHistory value={value}>{children}</TabsHistory>;
};
