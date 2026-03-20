import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useVisibilityChat = createStore('visibility-chat', true, {
  persist: { getStorage: () => AsyncStorage },
});

export const visibilityChatActions = createStoreAction(
  [
    (value: boolean) => {
      useVisibilityChat.setState({ data: value });
    },
    () => {
      useVisibilityChat.setState((state) => ({
        ...state,
        data: !state.data,
      }));
    },
  ],
  ['set', 'toggle']
);
