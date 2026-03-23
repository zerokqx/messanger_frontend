import { camelCase, kebabCase } from 'lodash';
import type { Config } from 'scripts/yobble-openapi-generator/types';

export default {
  urlify: ['chat_private'],
  baseUrlForApi: new URL(process.env.VITE_API_URL ?? ''),
  apiVersions: 'v1',
  openapiUrl: new URL('https://dev.api.yobble.org/docs/openapi'),
  authMiddlewarePath: '@/shared/middlewares/auth',
  fileName: kebabCase,
  middlewareServices: '*',
  credentialsServices: '*',
  methodNameTemplate: (service) => `$${camelCase(service)}`,
  saveTo: './src/shared/api/generated',
} satisfies Config;
