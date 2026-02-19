import { notify } from './notify';

export const pendingNotify = (message?: string, title?: string) => {
  notify.pending({ message, title });
};
