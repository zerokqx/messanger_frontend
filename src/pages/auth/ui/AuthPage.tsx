import { Tabs } from '@mantine/core';
import type { CurrentTabs } from '../types/tabsConfigCurrent.type';
import { tabsConfig } from '../config/tabs';

export const AuthPage = ({
  defaultValue = 'Логин',
}: {
  defaultValue?: CurrentTabs;
}) => {
  const { list, panels } = tabsConfig;
  return (
    <Tabs defaultValue={defaultValue}>
      <Tabs.List>
        {list.map((tab, i) => (
          <Tabs.Tab
            c={'white'}
            bdrs={'0px'}
            key={i.toString() + tab.text}
            value={tab.value}
          >
            {tab.text}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {panels.map((panel, i) => (
        <Tabs.Panel key={i.toString() + panel.value} value={panel.value}>
          {panel.render()()}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
