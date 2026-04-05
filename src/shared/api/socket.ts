import { io } from 'socket.io-client';

// В dev: прямой URL API сервера
// В prod: относительный путь (nginx проксирует /socket.io/)
export const socket = io(
  import.meta.env.DEV ? import.meta.env.VITE_API_URL : undefined,
  {
    autoConnect: false,
  }
);
