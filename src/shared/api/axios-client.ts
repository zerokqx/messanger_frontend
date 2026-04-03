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
  const isProd = import.meta.env.PROD;

  // В прод режиме куки работают на одном домене — сервер сам прочтёт куки и вернёт новые
  const body = isProd ? {} : { access_token: access, refresh_token: MOCK_REFRESH_TOKEN };

  const { data } = await Axios.post<RefreshResponse>(
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
  if (!nextAccess) {
    throw new Error('No access token in refresh response');
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
  config.headers.set('X-Client-Type', 'web');
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
      const isProd = import.meta.env.PROD;
      if (!isProd) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${nextAccess}`;
      }

      return AXIOS_INSTANCE(originalConfig);
    } catch {
      tokenAction.doReset();
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
