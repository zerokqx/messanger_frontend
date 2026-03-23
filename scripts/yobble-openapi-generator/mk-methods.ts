import { camelCase, kebabCase } from 'lodash';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import chalk from 'chalk';
import { config } from './config';

interface MkMethodsOptions {
  outputRoot: string;
  serviceName: string;
  baseUrl: string;
  middlewarePath?: string;
  withCredentials?: boolean;
  withMiddleware?: boolean; // Добавляем новый флаг
}

const template = ({
  variableName,
  baseUrl,
  middlewarePath,
  typeFileName,
  withCredentials,
  withMiddleware, // Прокидываем сюда
}: {
  variableName: string;
  typeFileName: string;
  baseUrl: string;
  middlewarePath?: string;
  withCredentials?: boolean;
  withMiddleware?: boolean;
}) => {
  // Импортируем и используем только если флаг true И путь указан
  const showMiddleware = withMiddleware && middlewarePath;

  const importMiddleware = showMiddleware
    ? `import { authMiddleware } from '${middlewarePath}';\n`
    : '';

  const useMiddleware = showMiddleware
    ? `\nfetchClient.use(authMiddleware);\n`
    : '';

  const credentialsOption = withCredentials
    ? `\n  credentials: 'include',`
    : '';

  return `${importMiddleware}import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/${typeFileName}';

const fetchClient = createFetchClient<paths>({
  baseUrl: '${baseUrl}',${credentialsOption}
});
${useMiddleware}
export const ${variableName} = createClient(fetchClient);
`;
};

export const mkMethods = async ({
  outputRoot,
  serviceName,
  baseUrl,
  middlewarePath,
  withCredentials,
  withMiddleware, // Принимаем флаг
}: MkMethodsOptions) => {
  const fileName = config.fileName
    ? `${config.fileName(serviceName)}.ts`
    : `${serviceName}.ts`;

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

  const variableName = config.methodNameTemplate
    ? config.methodNameTemplate(serviceName)
    : camelCase(serviceName);

  const content = template({
    baseUrl,
    variableName,
    typeFileName: config.fileName ? config.fileName(serviceName) : serviceName,
    middlewarePath,
    withCredentials,
    withMiddleware, // Передаем в шаблон
  });

  await mkdir(apiDir, { recursive: true });
  const finalPath = join(apiDir, fileName);
  await writeFile(finalPath, content, 'utf-8');

  console.log(
    chalk.blue('    ∟ ') +
      chalk.cyan('Методы:') +
      chalk.gray(` ${fileName}`) +
      (withCredentials ? chalk.yellow(' [creds]') : '') +
      (withMiddleware ? chalk.magenta(' [auth]') : '') // Логируем наличие мидлвара
  );
};
