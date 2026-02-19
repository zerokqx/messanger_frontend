import { notifications } from '@mantine/notifications';

type NotifyLevel = 'error' | 'success' | 'pending' | 'warning' | 'info';

interface NotifyPayload {
  message?: string;
  title?: string;
  id?: string;
  autoClose?: number | false;
}

interface NotifyUpdatePayload {
  message?: string;
  title?: string;
  autoClose?: number | false;
  color?: string;
  loading?: boolean;
}

const LEVEL_CONFIG: Record<
  NotifyLevel,
  {
    color: string;
    fallbackTitle: string;
    fallbackMessage: string;
  }
> = {
  error: {
    color: 'red',
    fallbackTitle: 'Error',
    fallbackMessage: 'Something went wrong',
  },
  success: {
    color: 'green',
    fallbackTitle: 'Success',
    fallbackMessage: 'Action completed successfully',
  },
  pending: {
    color: 'gray',
    fallbackTitle: 'Pending',
    fallbackMessage: 'Please wait',
  },
  warning: {
    color: 'yellow',
    fallbackTitle: 'Warning',
    fallbackMessage: 'Please check this action',
  },
  info: {
    color: 'blue',
    fallbackTitle: 'Info',
    fallbackMessage: 'New information is available',
  },
};

const showByLevel = (level: NotifyLevel, payload: NotifyPayload = {}) => {
  const config = LEVEL_CONFIG[level];

  notifications.show({
    id: payload.id,
    title: payload.title ?? config.fallbackTitle,
    message: payload.message ?? config.fallbackMessage,
    color: config.color,
    autoClose: payload.autoClose,
  });
};

export const notify = {
  error(payload: NotifyPayload = {}) {
    showByLevel('error', payload);
  },

  success(payload: NotifyPayload = {}) {
    showByLevel('success', payload);
  },

  pending(payload: NotifyPayload = {}) {
    showByLevel('pending', payload);
  },

  warning(payload: NotifyPayload = {}) {
    showByLevel('warning', payload);
  },

  info(payload: NotifyPayload = {}) {
    showByLevel('info', payload);
  },

  loading(payload: NotifyPayload = {}) {
    notifications.show({
      id: payload.id,
      title: payload.title ?? 'Loading',
      message: payload.message ?? 'Please wait',
      color: 'gray',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
  },

  update(id: string, payload: NotifyUpdatePayload) {
    notifications.update({
      id,
      title: payload.title,
      message: payload.message,
      autoClose: payload.autoClose,
      color: payload.color,
      loading: payload.loading,
    });
  },

  hide(id: string) {
    notifications.hide(id);
  },

  clean() {
    notifications.clean();
  },
};

export type { NotifyPayload, NotifyUpdatePayload };
