import { useEffectOnce } from 'react-use';
import type { TaberProviderProp } from '../types/TaberContextState';
import { keys } from 'lodash';
import { useState } from 'react';
import { RequireExactlyOne } from 'type-fest';
const registerTabs: TabsSources[] = new Set();

export const TaberProvider = <
  V extends TabsSources,
  I extends TabsWindows[V][],
>({
  key,
  windows,
  initial,
}: {
  key: V;
  windows: I;
  initial: I[number];
}) => {
  const [history, setHistory] = useState<TabsWindows[V][]>([initial]);
  const [curTab, setCurTab] = useState<TabsWindows[V] | null>(null);

  useEffectOnce(() => {
    const d = keys(value);
    console.log(d);
  });
};

TaberProvider({
  key: 'asside',
  windows: ['chats', 'profile'],
  initial: 'chats',
});
