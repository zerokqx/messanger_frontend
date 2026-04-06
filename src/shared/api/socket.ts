import { io } from 'socket.io-client';

// В prod: напрямую на API домен (чтобы бэкенд видел реальный IP клиента)
// Токен передаётся через auth параметр, куки не нужны
export const socket = io(
  import.meta.env.VITE_API_URL,
  {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
  }
);
