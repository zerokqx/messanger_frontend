import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { tokenAction } from '../token';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  data?: {
    access_token?: string;
  };
}

const MOCK_REFRESH_TOKEN = 'cookie-refresh-token';
export const ACCESS_COOKIE_NAME = 'yobble_access_token';

/** Читаем значение куки по имени */
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );
  return match?.[1] ?? null;
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (access: string): Promise<string> => {
<<<<<<< Updated upstream
||||||| Stash base
  const isProd = import.meta.env.PROD;

  // В прод режиме куки работают на одном домене — сервер сам прочтёт куки и вернёт новые
  const body = isProd
    ? {}
    : { access_token: access, refresh_token: MOCK_REFRESH_TOKEN };

  const { data } = await Axios.post<RefreshTokenResponse>(
=======
  const isProd = import.meta.env.PROD;

  // В прод режиме куки работают на одном домене — сервер сам прочтёт куки и вернёт новые
  const body = isProd
    ? {}
    : { access_token: access, refresh_token: MOCK_REFRESH_TOKEN };

>>>>>>> Stashed changes
  const { data } = await Axios.post<RefreshResponse>(
    `${import.meta.env.VITE_API_URL}/v1/auth/token/refresh`,
    {
      access_token: access,
      refresh_token: MOCK_REFRESH_TOKEN,
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
    }
  );

  const nextAccess = data.data?.access_token;
<<<<<<< Updated upstream
  if (!nextAccess) {
||||||| Stash base

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
=======

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
        tokenAction.doSetToken(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature'
        );
        return cookieToken;
      }
    }
>>>>>>> Stashed changes
    throw new Error('No access token in refresh response');
  }

<<<<<<< Updated upstream
||||||| Stash base
  // В прод режиме сохраняем placeholder JWT, т.к. методы используют cookie
  if (isProd) {
    tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
    // Форсируем проверку куки для обновления состояния авторизации
    window.dispatchEvent(new CustomEvent('auth:refresh-completed'));
    return nextAccess;
  }

=======
  // В прод режиме сохраняем placeholder JWT, т.к. методы используют cookie
  if (isProd) {
    tokenAction.doSetToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature'
    );
    // Форсируем проверку куки для обновления состояния авторизации
    window.dispatchEvent(new CustomEvent('auth:refresh-completed'));
    return nextAccess;
  }

>>>>>>> Stashed changes
  tokenAction.doSetToken(nextAccess);
  return nextAccess;
};

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = tokenAction.doGetToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
AXIOS_INSTANCE.interceptors.request.use((config) => {
<<<<<<< Updated upstream
  config.headers.set('X-Client-Type', 'web');
||||||| Stash base
  config.headers.set('X-Client-Type', import.meta.env.DEV ? 'unknown' : 'web');
=======
  config.headers.set('X-Client-Type', import.meta.env.DEV ? 'web-dev' : 'web');
>>>>>>> Stashed changes
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
      tokenAction.doReset();
      return Promise.reject(error);
    }

    const access = tokenAction.doGetToken();
    if (!access) {
      tokenAction.doReset();
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    try {
      refreshPromise ??= refreshAccessToken(access).finally(() => {
        refreshPromise = null;
      });

      const nextAccess = await refreshPromise;
      originalConfig.headers = originalConfig.headers ?? {};
      originalConfig.headers.Authorization = `Bearer ${nextAccess}`;

<<<<<<< Updated upstream
      return void AXIOS_INSTANCE(originalConfig);
    } catch {
      tokenAction.doReset();
||||||| Stash base
      if (!isProd) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${nextAccess}`;
      }

      return await AXIOS_INSTANCE(originalConfig);
    } catch {
      resetSession();
=======
      // В прод режиме после успешного refresh перезагружаем страницу
      // чтобы роутер пересчитал состояние auth с новым токеном
      if (isProd) {
        window.location.reload();
      }

      if (!isProd) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${nextAccess}`;
      }

      return await AXIOS_INSTANCE(originalConfig);
    } catch (err) {
      const isSessionError =
        err instanceof AxiosError && err.response?.status === 401;
      if (isSessionError) {
        tokenAction.doReset();
        window.location.href = '/auth';
      }
>>>>>>> Stashed changes
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
  }).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;

export type ResponseType<T> = T; // Говорим
export type MutatorResponse<T> = T; // Для мутаций
