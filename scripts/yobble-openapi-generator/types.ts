type AllOrArray = string[] | '*';

export interface Config {
  apiVersions?: Record<string, string> | 'v1';
  openapiUrl: URL;
  baseUrlForApi: URL;
  urlify?: string[];
  authMiddlewarePath?: string;
  credentialsServices?: AllOrArray;
  middlewareServices?: AllOrArray;
  fileName?: (service: string) => string;
  methodNameTemplate?: (serviceName: string) => string;
  saveTo: string;
}
