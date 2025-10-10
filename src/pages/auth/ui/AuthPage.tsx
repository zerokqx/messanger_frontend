import { Tabs } from "@mantine/core";
import type { CurrentTabs } from "../types/tabsConfigCurrent.type";
import { tabsConfig } from "../config/tabs";

export const AuthPage = ({
  defaultValue = "Логин",
}: {
  defaultValue?: CurrentTabs;
}) => {
  const { list, panels } = tabsConfig;
  return (
    <Tabs defaultValue={defaultValue}>
      <Tabs.List>
        {list.map((tab) => (
          <Tabs.Tab value={tab.value}>{tab.text}</Tabs.Tab>
        ))}
      </Tabs.List>
      {panels.map((panel) => (
        <Tabs.Panel value={panel.value}>{panel.render()()}</Tabs.Panel>
      ))}
    </Tabs>
  );
};
