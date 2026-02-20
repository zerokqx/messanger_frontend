import { notify } from './notify';

export const successNotify = (message?: string, title?: string) => {
  notify.success({ message, title });
};
