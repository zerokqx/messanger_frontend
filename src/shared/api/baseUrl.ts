export type Services = 'auth' | 'user' | 'profile' | 'feed' | 'chat';
export type Version = 'v1';
export type BaseUrlDomain = `https://${string}`;
/**
 * @param service
 * @param version Version api
 * @param url Endpoint url, can only https
 * @see `Version`
 * @see `Services`
 * @summary Function for template endpoint
 *
 */
export function createBaseUrl<S extends Services>(
  service: S
): `https://api.yobble.org/v1/${S}`;
export function createBaseUrl<U extends BaseUrlDomain, S extends Services>(
  service: S,
  version: Version,
  url: U
): `${U}/${Version}/${S}`;
export function createBaseUrl<
  U extends BaseUrlDomain = 'https://api.yobble.org',
  S extends Services = Services,
>(
  service: S,
  version: Version = 'v1',
  url: U = 'https://api.yobble.org' as U
): `${U}/${Version}/${S}` {
  return `${url}/${version}/${service}`;
}
