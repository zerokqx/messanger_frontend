import type { Fn } from '@/shared/types/utils/functions';
import { createStore, type CreateStoreType } from '@colorfy-software/zfy';

interface LoaderStateStore {
  state: boolean;
}
interface LoaderStateActionStore {
  doSetLoad: Fn<[LoaderStateStore['state']], void>;
  doLoad: Fn<[], void>;
  doStopLoad: Fn<[], void>;
}
interface LoaderStateHooks {
  useLoad: () => LoaderStateStore['state'];
}
export const createLoaderStore: Fn<
  [`loader-state-${string}`, boolean?],
  [CreateStoreType<LoaderStateStore>, LoaderStateActionStore, LoaderStateHooks]
> = (name, initial = false) => {
  const useStore = createStore<LoaderStateStore>(name, {
    state: initial,
  });
  const doSetLoad = (state: boolean) => {
    useStore.setState({ data: { state } });
  };
  const doLoad = () => {
    doSetLoad(true);
  };
  const useLoad = () => {
    const state = useStore((s) => s.data.state);
    return state;
  };
  const doStopLoad = () => {
    doSetLoad(false);
  };
  return [
    useStore,
    {
      doSetLoad,
      doLoad,
      doStopLoad,
    },
    {
      useLoad,
    },
  ];
};
