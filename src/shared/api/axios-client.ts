import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { tokenAction } from '../token';
import {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
} from './auth-session';

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, '') ||
  'https://dev.api.yobble.org';

// В dev: прокси через Vite `/api`
// В prod: напрямую через nginx `/v1/` (без `/api` префикса)
export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.DEV ? '/api' : API_BASE_URL,
  withCredentials: true,
});

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const MOCK_REFRESH_TOKEN = 'cookie-refresh-token';

let refreshPromise: Promise<string> | null = null;

const resetSession = () => {
  console.log('❌ [RESET SESSION] Logging out user');
  tokenAction.doReset();

  if (window.location.pathname !== '/auth') {
    console.log('❌ [RESET SESSION] Redirecting to /auth from', window.location.pathname);
    window.location.href = '/auth';
  }
};

const refreshAccessToken = async (_access: string): Promise<string> => {
  const isProd = import.meta.env.PROD;

  // Не отправляем токены в теле — сервер сам прочитает их из куки
  if (!isProd) {
    console.log('🔄 [REFRESH REQUEST]', {
      stored_access_token: _access.substring(0, 30) + '...',
      body: 'empty (server reads from cookie)',
    });
  }

  // В проде запрос идёт напрямую на API домен, в дев — через прокси /api
  const promise = isProd
    ? Axios.post<RefreshTokenResponse>(
        `${API_BASE_URL}/v1/auth/token/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Type': 'web',
          },
        }
      )
    : AXIOS_INSTANCE.post<RefreshTokenResponse>(
        '/v1/auth/token/refresh',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

  const { data } = await promise;

  const nextAccess = data.data?.access_token;
  const nextRefresh = data.data?.refresh_token;

  if (!isProd) {
    console.log('🔄 [REFRESH RESPONSE]', {
      raw_data: data,
      new_access_token: nextAccess,
      new_refresh_token: nextRefresh,
    });
  }

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
    console.log('🔄 [PROD] Setting placeholder token and dispatching event');
    tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
    // Форсируем проверку куки для обновления состояния авторизации
    window.dispatchEvent(new CustomEvent('auth:refresh-completed'));
    return nextAccess;
  }

  tokenAction.doSetToken(nextAccess);
  return nextAccess;
};

AXIOS_INSTANCE.interceptors.request.use((config) => {
  config.headers.set('X-Client-Type', import.meta.env.DEV ? 'web-dev' : 'web');
  
  // Логируем токены в dev режиме
  if (import.meta.env.DEV) {
    const storedToken = tokenAction.doGetToken();
    if (storedToken) {
      console.log('🔑 [REQUEST TOKEN]', {
        url: config.url,
        stored_token: storedToken.substring(0, 30) + '...',
        header_set: config.headers.Authorization ? 'yes' : 'no',
      });
    }
  }
  
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
