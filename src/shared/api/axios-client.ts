import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { tokenAction } from '../token';
import {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
} from './auth-session';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: '/api',
  withCredentials: true,
});

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const MOCK_REFRESH_TOKEN = 'cookie-refresh-token';

let refreshPromise: Promise<string> | null = null;

const resetSession = () => {
  tokenAction.doReset();

  if (window.location.pathname !== '/auth') {
    window.location.href = '/auth';
  }
};

const refreshAccessToken = async (access: string): Promise<string> => {
  const isProd = import.meta.env.PROD;

  // В прод режиме куки работают на одном домене — сервер сам прочтёт куки и вернёт новые
  const body = isProd
    ? {}
    : { access_token: access, refresh_token: MOCK_REFRESH_TOKEN };

  const { data } = await Axios.post<RefreshTokenResponse>(
    `${import.meta.env.VITE_API_URL}/v1/auth/token/refresh`,
    body,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
    }
  );

  const nextAccess = data.data?.access_token;

  // Проверяем что токен существует и не является строкой "none"
  if (
    !nextAccess ||
    nextAccess.toLowerCase() === 'none' ||
    nextAccess.trim() === ''
  ) {
    // В прод режиме пробуем прочитать токен из куки
    if (isProd) {
      const cookieToken = getCookie(ACCESS_COOKIE_NAME);
      if (cookieToken && cookieToken.toLowerCase() !== 'none') {
        // В прод режиме сохраняем валидный placeholder JWT, т.к. методы используют cookie
        tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
        return cookieToken;
      }
    }
    throw new Error('No access token in refresh response');
  }

  // В прод режиме сохраняем placeholder JWT, т.к. методы используют cookie
  if (isProd) {
    tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
    // Форсируем проверку куки для обновления состояния авторизации
    window.dispatchEvent(new CustomEvent('auth:refresh-completed'));
    return nextAccess;
  }

  tokenAction.doSetToken(nextAccess);
  return nextAccess;
};

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const isProd = import.meta.env.PROD;
  if (!isProd) {
    const token = tokenAction.doGetToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
AXIOS_INSTANCE.interceptors.request.use((config) => {
  config.headers.set('X-Client-Type', import.meta.env.DEV ? 'unknown' : 'web');
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as RetryAxiosRequestConfig | undefined;

    if (!originalConfig || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (
      originalConfig._retry ||
      originalConfig.url?.includes('/v1/auth/token/refresh')
    ) {
      resetSession();
      return Promise.reject(error);
    }

    const access = tokenAction.doGetToken();
    if (!access) {
      resetSession();
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    try {
      refreshPromise ??= refreshAccessToken(access).finally(() => {
        refreshPromise = null;
      });

      const nextAccess = await refreshPromise;
      const isProd = import.meta.env.PROD;

      if (!isProd) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${nextAccess}`;
      }

      return await AXIOS_INSTANCE(originalConfig);
    } catch {
      resetSession();
      return Promise.reject(new Error('Refresh error'));
    }
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }: { data: T }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;

export type ResponseType<T> = T; // Говорим
export type MutatorResponse<T> = T; // Для мутаций
