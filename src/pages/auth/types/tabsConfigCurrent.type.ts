import type { tabsConfig } from "../config/tabs";

export type CurrentTabs = (typeof tabsConfig)["list"][number]["value"];
