import { resolve } from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';

// Твои локальные импорты
import { fetchAndSaveServiceSchema } from './fetch-service-schema';
import { mkMethods } from './mk-methods';
import { fetchServiceNames } from './service-names';
import { mkIndex } from './mk-index';
import { mkRootIndex } from './mk-root-index';

interface GeneratorOptions {
  output: string;
  middleware?: string;
  credentials?: boolean;
  apiVersion?: string; // Новая опция
}

export const program = new Command();

program
  .option(
    '-o, --output <path>',
    'Корневая директория для генерации SDK',
    './src/shared/api/generated'
  )
  .option(
    '--mw, --middleware <path>',
    'Путь для импорта authMiddleware (например: "@/shared/middlewares/auth")'
  )
  .option(
    '-c, --credentials',
    'Включить credentials: "include" в конфиг fetchClient',
    false
  )
  .option(
    '--api-version <version>',
    'Версия API (например: v1)',
    '' // По умолчанию пусто
  );

program.parse();
const options = program.opts<GeneratorOptions>();

const API_BASE = (process.env.VITE_API_URL ?? 'https://dev.api.yobble.org').replace(/\/$/, '');
const OPENAPI_URL = process.env.OPENAPI_URL ?? `${API_BASE}/docs/openapi`;

const RAW_URLIFY = process.env.COMBINED_OPENAPI_URLIFY;
const URLIFY_LIST = (RAW_URLIFY ? JSON.parse(RAW_URLIFY) : []) as string[];

async function run() {
  try {
    const root = resolve(options.output);
    const typesDir = resolve(root, 'types');
    const apiDir = resolve(root, 'api');

    console.log(chalk.bold.cyan(`\n🚀 Запуск генерации SDK`));
    
    if (options.apiVersion) {
      console.log(chalk.magenta(`🏷️  Версия API: ${options.apiVersion}`));
    }
    if (options.credentials) {
      console.log(chalk.yellow('🔑 Режим с Credentials включен'));
    }

    const services = await fetchServiceNames(OPENAPI_URL, URLIFY_LIST);
    console.log(chalk.blue(`🔍 Найдено сервисов: ${services.length}\n`));

    for (const service of services) {
      console.log(chalk.bgBlue.white.bold(` ${service.original.toUpperCase()} `));

      // 1. Качаем схемы
      process.stdout.write(chalk.yellow('  📦 Загрузка схем... '));
      await fetchAndSaveServiceSchema({
        baseUrl: OPENAPI_URL,
        saveTo: typesDir,
        serviceName: service.original,
      });
      console.log(chalk.green('OK'));

      // 2. Формируем URL с учетом версии
      // Логика: BASE / [VERSION] / SERVICE_CLEAN
      const urlParts = [API_BASE];
      if (options.apiVersion) urlParts.push(options.apiVersion.replace(/^\//, ''));
      urlParts.push(service.clean);
      
      const serviceApiUrl = urlParts.join('/');

      process.stdout.write(chalk.yellow('  ⚙️  Генерация методов... '));
      await mkMethods({
        outputRoot: root,
        serviceName: service.original,
        baseUrl: serviceApiUrl,
        middlewarePath: options.middleware,
        withCredentials: options.credentials,
      });
      console.log(chalk.green('OK\n'));
    }

    console.log(chalk.bold.magenta('📦 Финализация индексов...'));
    await mkIndex(typesDir, false);
    await mkIndex(apiDir, true);
    await mkRootIndex(root);

    console.log(chalk.bold.green('\n✨ Все операции успешно завершены!\n'));
  } catch (error) {
    console.error(chalk.red.bold('\n💥 Фатальная ошибка:'), error);
    process.exit(1);
  }
}

void run();
