import z from 'zod';

export const ACCESS_COOKIE_NAME = 'yobble_access_token';

export interface RefreshTokenResponse {
  data?: {
    access_token?: string;
  };
}

export const PROD_PLACEHOLDER_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature';

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);

  return match?.[1] ?? null;
};

export const hasValidAccessCookie = (): boolean => {
  const token = getCookie(ACCESS_COOKIE_NAME);

  return Boolean(token && token.trim() !== '' && token.toLowerCase() !== 'none');
};

export const isPlaceholderAccessToken = (token: string): boolean =>
  token === PROD_PLACEHOLDER_ACCESS_TOKEN;

export const isClientSessionAuthorized = (token: string): boolean => {
  if (!token) {
    return false;
  }

  if (isPlaceholderAccessToken(token)) {
    return import.meta.env.PROD && hasValidAccessCookie();
  }

  return z.jwt().safeParse(token).success;
};
