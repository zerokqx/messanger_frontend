import type { paths } from "../types/v1";

export type HttpMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type AllPathsByMethod<Method extends HttpMethod> = {
  [P in keyof paths]: paths[P][Method] extends undefined ? never : P;
}[keyof paths];

export type TypedQueryKey<Method extends HttpMethod> = [
  Method,
  AllPathsByMethod<Method>,
];

export const typedQueryKey = <Method extends HttpMethod>(
  method: Method,
  path: AllPathsByMethod<Method>
): TypedQueryKey<Method> => {
  return [method, path];
};
