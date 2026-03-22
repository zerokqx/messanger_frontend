import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Создает корневой индекс, который объединяет API и Типы
 */
export const mkRootIndex = async (rootPath: string) => {
  const content = [
    '// Реэкспорт всего функционала и типов',
    "export * from './api';",
    "export * from './types';",
  ].join('\n') + '\n';

  await writeFile(join(rootPath, 'index.ts'), content, 'utf-8');
  console.log(`🚀 Root Index создан в: ${rootPath}`);
};
