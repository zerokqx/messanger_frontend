// Copyright (c) 2026 zerokqx
// SPDX-License-Identifier: MIT
export const SERVICE_CONFIG = {
  auth: true,
  user: true,
  profile: true,
  feed: true,
  chat: true,
  achievement: true,
  socket: true,
  "chat/private":true,
} as const;

export type Services = keyof typeof SERVICE_CONFIG;
export const SERVICES = Object.keys(SERVICE_CONFIG) as Services[];

type Version = 'v1';
type BaseUrlDomain = `https://${string}`;
const useProxy = import.meta.env.VITE_PROXY_API === 'true';
const directApiUrl = import.meta.env.VITE_API_URL.trim();

if (!useProxy && !directApiUrl) {
  throw new Error(
    'VITE_API_URL is required when VITE_PROXY_API=false. Provide absolute https URL.'
  );
}

const apiUrl = useProxy ? '/api' : directApiUrl;
/**
 * @param service
 * @param version Version api
 * @param url Endpoint url, can only https
 * @see `Version`
 * @see `Services`
 * @summary Function for template endpoint
 *
 */
export function createBaseUrl<S extends Services>(service: S): `${string}${S}`;
export function createBaseUrl<U extends BaseUrlDomain, S extends Services>(
  service: S,
  version: Version,
  url: U
): `${U}/${Version}/${S}`;
export function createBaseUrl<U extends string, S extends Services = Services>(
  service: S,
  version: Version = 'v1',
  url: U = apiUrl as U
): `${U}/${Version}/${S}` {
  return `${url}/${version}/${service}`;
}
