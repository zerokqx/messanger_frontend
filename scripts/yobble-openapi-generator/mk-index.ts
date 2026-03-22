import { writeFile, readdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { camelCase, upperFirst } from 'lodash';

export const mkIndex = async (dirPath: string, isMethods: boolean) => {
  const entries = await readdir(dirPath, { withFileTypes: true });
  
  // Берем только .ts файлы, исключая сам index.ts
  const files = entries
    .filter(e => e.isFile() && e.name.endsWith('.ts') && e.name !== 'index.ts')
    .map(e => basename(e.name, extname(e.name)));

  const content = files
    .map(file => {
      if (isMethods) {
        // Для методов: просто пробрасываем всё
        // export * from './auth-service';
        return `export * from './${file}';`;
      }
      
      // Для типов: формируем имя типа AuthService (PascalCase)
      // export type * as AuthService from './auth-service';
      const typeNamespace = upperFirst(camelCase(file));
      return `export type * as ${typeNamespace} from './${file}';`;
    })
    .join('\n');

  const finalContent = isMethods 
    ? `// Генерируемый файл. Не редактировать вручную.\n${content}\n`
    : `// Генерируемый файл типов. Доступ через Namespace.\n${content}\n`;

  await writeFile(join(dirPath, 'index.ts'), finalContent, 'utf-8');
  console.log(`📂 Index создан в: ${dirPath} (${isMethods ? 'Methods' : 'Types'})`);
};
