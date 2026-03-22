import { camelCase, kebabCase } from 'lodash';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import chalk from 'chalk';

interface MkMethodsOptions {
  outputRoot: string;
  serviceName: string;
  baseUrl: string;
  // Новые опции
  middlewarePath?: string; // Путь для импорта, например '@/shared/middlewares/auth'
  withCredentials?: boolean;
}

const template = ({
  variableName,
  serviceName,
  baseUrl,
  middlewarePath,
  withCredentials,
}: {
  variableName: string;
  serviceName: string;
  baseUrl: string;
  middlewarePath?: string;
  withCredentials?: boolean;
}) => {
  const importMiddleware = middlewarePath
    ? `import { authMiddleware } from '${middlewarePath}';\n`
    : '';

  const useMiddleware = middlewarePath
    ? `fetchClient.use(authMiddleware);\n`
    : '';

  const credentialsOption = withCredentials
    ? `\n  credentials: 'include',`
    : '';

  return `${importMiddleware}import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/${kebabCase(serviceName)}';

const fetchClient = createFetchClient<paths>({
  baseUrl: '${baseUrl}',${credentialsOption}
});

${useMiddleware}
export const $${variableName} = createClient(fetchClient);
`;
};

export const mkMethods = async ({
  outputRoot,
  serviceName,
  baseUrl,
  middlewarePath,
  withCredentials,
}: MkMethodsOptions) => {
  const fileName = `${kebabCase(serviceName)}.ts`;

  const apiDir = resolve(outputRoot, 'api');
  const typesDir = resolve(outputRoot, 'types');
  const typeFilePath = join(typesDir, fileName);

  try {
    await access(typeFilePath);
  } catch {
    console.error(
      chalk.red(
        `    ❌ Пропуск: типы для ${chalk.bold(serviceName)} не найдены`
      )
    );
    return;
  }

  const content = template({
    baseUrl,
    variableName: camelCase(serviceName),
    serviceName,
    middlewarePath,
    withCredentials,
  });

  await mkdir(apiDir, { recursive: true });
  const finalPath = join(apiDir, fileName);
  await writeFile(finalPath, content, 'utf-8');

  console.log(
    chalk.blue('    ∟ ') +
      chalk.cyan('Методы:') +
      chalk.gray(` ${fileName}`) +
      (withCredentials ? chalk.yellow(' [with creds]') : '')
  );
};
