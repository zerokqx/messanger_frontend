import { io } from 'socket.io-client';

// В prod: напрямую на API домен (чтобы бэкенд видел реальный IP клиента)
// Токен передаётся через query параметр, куки не нужны
export const socket = io(
  import.meta.env.VITE_API_URL,
  {
    autoConnect: false,
  }
);
