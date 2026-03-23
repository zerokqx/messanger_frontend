import { merge } from 'lodash';
import myConfig from '../../yobble-openapi-generator.config';
import type { Config } from './types';

const defaultConfig = {
  apiVersions: 'v1',
  urlify: ['chat_private'],
  baseUrlForApi: new URL(process.env.VITE_API_URL ?? ''),
  openapiUrl: new URL('https://dev.api.yobble.org/docs/openapi'),
  fileName: (service) => service,
  credentialsServices: '*',
  methodNameTemplate: (service) => service,
  saveTo: './src/shared/api/generated',
} satisfies Config;

export const config = merge<Config,Config>(defaultConfig, myConfig) ;
