import type { JSX } from 'react';

interface ListItem<Value extends string> {
  value: Value;
  text: string;
}
interface PanelItem<Value extends string> {
  value: Value;
  render: () => () => JSX.Element;
}
export interface TabsConfig<Value extends Capitalize<string>> {
  panels: PanelItem<Value>[];
  list: ListItem<Value>[];
}
