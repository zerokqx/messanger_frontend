import { createContext } from "@fluentui/react-context-selector";
import type { TabsState, TabsReducerAction } from "./history-provider";

export interface TabsContextValue {
  state: TabsState;
  dispatch: React.Dispatch<TabsReducerAction>;
}

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);
