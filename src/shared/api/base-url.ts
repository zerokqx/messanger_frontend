export type Services = 'auth' | 'user' | 'profile' | 'feed' | 'chat';
type Version = 'v1';
type BaseUrlDomain = `https://${string}`;
const apiUrl = import.meta.env.VITE_API_URL as string;
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
export function createBaseUrl<
  U extends string  ,
  S extends Services = Services,
>(
  service: S,
  version: Version = 'v1',
  url: U = apiUrl as U
): `${U}/${Version}/${S}` {
  return `${url}/${version}/${service}`;
}
