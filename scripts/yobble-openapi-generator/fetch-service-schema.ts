import openapiTS, { astToString } from 'openapi-typescript';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { kebabCase } from 'lodash';
import { purePath } from './pure-path';

interface FetchServiceSchemaOptions {
  saveTo: string;
  serviceName: string;
  baseUrl: string;
}

export const fetchAndSaveServiceSchema = async ({
  baseUrl,
  saveTo,
  serviceName,
}: FetchServiceSchemaOptions) => {
  const ast = await openapiTS(`${baseUrl}/${serviceName}`);
  const content = astToString(ast);
  const dir = purePath(saveTo);
  const fileName = `${kebabCase(serviceName)}.ts`;
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, fileName), content, 'utf-8');
  console.log(`📥 Типы: ${serviceName} -> ${join(dir, fileName)}`);
};
