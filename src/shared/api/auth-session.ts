import z from 'zod';
import { getCookie as getCookieFromLib } from '../lib/get-cookie';

export const getCookie = getCookieFromLib;

export const ACCESS_COOKIE_NAME = 'yobble_access_token';
export const CLIENT_TYPE = import.meta.env.DEV ? 'web-dev' : 'web';

export interface RefreshTokenResponse {
  data?: {
    access_token?: string;
  };
}

export const PROD_PLACEHOLDER_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature';

export const hasValidAccessCookie = (): boolean => {
  const token = getCookie(ACCESS_COOKIE_NAME);

  return Boolean(token && token.trim() !== '' && token.toLowerCase() !== 'none');
};

export const isPlaceholderAccessToken = (token: string): boolean =>
  token === PROD_PLACEHOLDER_ACCESS_TOKEN;

export const normalizeAccessToken = (
  token?: string | null
): string | null => {
  if (!token) {
    return null;
  }

  const normalizedToken = token.trim();

  if (normalizedToken === '' || normalizedToken.toLowerCase() === 'none') {
    return null;
  }

  return normalizedToken;
};

export const getSessionStoreToken = (
  accessToken?: string | null
): string | null => {
  if (hasValidAccessCookie()) {
    return PROD_PLACEHOLDER_ACCESS_TOKEN;
  }

  return normalizeAccessToken(accessToken);
};

export const getSocketAuthToken = (accessToken?: string | null): string => {
  const cookieToken = normalizeAccessToken(getCookie(ACCESS_COOKIE_NAME));

  if (cookieToken) {
    return cookieToken;
  }

  const normalizedAccessToken = normalizeAccessToken(accessToken);

  if (!normalizedAccessToken) {
    return '';
  }

  return isPlaceholderAccessToken(normalizedAccessToken)
    ? ''
    : normalizedAccessToken;
};

export const isClientSessionAuthorized = (token: string): boolean => {
  if (hasValidAccessCookie()) {
    return true;
  }

  if (!token) {
    return false;
  }

  if (isPlaceholderAccessToken(token)) {
    return false;
  }

  return z.jwt().safeParse(token).success;
};
