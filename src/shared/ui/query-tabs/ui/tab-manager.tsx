import type { Dispatch, ReactNode } from 'react';
import {
  TabManagerProvider,
  useTabManager,
  type TabContext,
  type TabReducerActions,
} from '../model/history-context';
import { motion } from 'motion/react';

interface TabManagerProps {
  children?: ReactNode;
}

interface TabManagerUseApiProps {
  children: (props: {
    dispatch: Dispatch<TabReducerActions>;
    state: TabContext;
  }) => ReactNode;
}
interface TabManagerTabProps {
  children?: ReactNode;
  value: string;
}
interface TabManagerComponent {
  (props: TabManagerProps): ReactNode;
  Tab: (props: TabManagerTabProps) => ReactNode;
  UseApi: (props: TabManagerUseApiProps) => ReactNode;
}

export const UseApi: TabManagerComponent['UseApi'] = ({ children }) => {
  const [state, dispatch] = useTabManager();
  return children({ state, dispatch });
};

export const Tab: TabManagerComponent['Tab'] = ({ children, value }) => {
  const [state] = useTabManager();

  if (state.current !== value) return null;

  return (
    <motion.div
      key={value}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
export const TabManager: TabManagerComponent = ({ children }) => {
  return <TabManagerProvider>{children}</TabManagerProvider>;
};
TabManager.UseApi = UseApi;
TabManager.Tab = Tab;
