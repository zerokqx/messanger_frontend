import { notify } from './notify';

export const errorNotify = (message?: string, title?: string) => {
  notify.error({ message, title });
};
