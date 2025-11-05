import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import localforage from 'localforage';

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: localforage,
});
