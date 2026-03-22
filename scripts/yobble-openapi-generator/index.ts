import { fetchAndSaveServiceSchema } from './fetch-service-schema';
import { mkMethods } from './mk-methods';
import { fetchServiceNames } from './service-names';
import { resolve } from 'node:path';
import { Command } from 'commander';
import { mkIndex } from './mk-index';
import { mkRootIndex } from './mk-root-index';
import chalk from 'chalk';

interface GeneratorOptions {
  output: string;
  middleware?: string;
  credentials?: boolean;
}

export const program = new Command();

program
  .option(
    '-o, --output <path>',
    'Корневая директория для SDK',
    './src/shared/api/generated'
  )
  .option(
    '--mw, --middleware <path>',
    'Путь к authMiddleware (например: "@/shared/middlewares/auth")'
  )
  .option(
    '-c, --credentials',
    'Включить credentials: "include" для всех запросов',
    false
  );

program.parse();
const options = program.opts<GeneratorOptions>();

const API_BASE = process.env.OPENAPI_URL ?? 'https://dev.api.yobble.org';
const RAW_URLIFY = process.env.COMBINED_OPENAPI_URLIFY;
const URLIFY_LIST = (RAW_URLIFY ? JSON.parse(RAW_URLIFY) : []) as string[];

async function run() {
  try {
    const root = resolve(options.output);
    const typesDir = resolve(root, 'types');

    console.log(chalk.bold.cyan(`\n🚀 Запуск генерации SDK`));
    if (options.credentials) console.log(chalk.yellow('  🔑 Режим с Credentials включен'));
    if (options.middleware) console.log(chalk.blue(`  🛡️  Middleware: ${options.middleware}`));

    const services = await fetchServiceNames(API_BASE, URLIFY_LIST);

    for (const service of services) {
      console.log(chalk.bgBlue.white.bold(` ${service.original.toUpperCase()} `));

      // 1. Качаем типы
      await fetchAndSaveServiceSchema({
        baseUrl: API_BASE,
        saveTo: typesDir,
        serviceName: service.original,
      });

      // 2. Генерим методы с новыми опциями
      await mkMethods({
        outputRoot: root,
        serviceName: service.original,
        baseUrl: API_BASE,
        middlewarePath: options.middleware, // Передаем путь
        withCredentials: options.credentials, // Передаем флаг
      });
    }

    console.log(chalk.bold.magenta('\n📦 Финализация индексов...'));
    await mkIndex(resolve(root, 'types'), false);
    await mkIndex(resolve(root, 'api'), true);
    await mkRootIndex(root);

    console.log(chalk.bold.green('\n✨ Все операции завершены!\n'));
  } catch (error) {
    console.error(chalk.red.bold('\n💥 Фатальная ошибка:'), error);
    process.exit(1);
  }
}

void run();
