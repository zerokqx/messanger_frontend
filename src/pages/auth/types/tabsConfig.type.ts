import type { JSX } from 'react';

type ListItem<Value extends string> = {
  value: Value;
  text: string;
};
type PanelItem<Value extends string> = {
  value: Value;
  render: () => () => JSX.Element;
};
export type TabsConfig<Value extends Capitalize<string>> = {
  panels: PanelItem<Value>[];
  list: ListItem<Value>[];
};
