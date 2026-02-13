import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import type { TabsDeclarationKeys } from '@/shared/ui/query-tabs';
import { createStore } from '@colorfy-software/zfy';
interface PanelModeState {
  mode: TabsDeclarationKeys;
}

export const usePanelMode = createStore<PanelModeState>('panel-mode-navbar', {
  mode: 'tnavbar',
});

export const panelModeActions = createStoreAction(
  [
    (mode: PanelModeState['mode']) => {
      usePanelMode.setState({ data: { mode } });
    },
  ],
  ['set']
);
