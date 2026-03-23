import { resolve } from 'node:path';
import chalk from 'chalk';
import { log } from 'node:console';
import { entries, forEach, isArray, isObject, isString } from 'lodash';

import { fetchAndSaveServiceSchema } from './fetch-service-schema';
import { mkMethods } from './mk-methods';
import { fetchServiceNames } from './service-names';
import { mkIndex } from './mk-index';
import { mkRootIndex } from './mk-root-index';
import { config } from './config';

const API_BASE = config.baseUrlForApi.toString().replace(/\/$/, '');
const OPENAPI_URL = config.openapiUrl.toString();
const URLIFY_LIST = config.urlify ?? [];

async function run() {
  try {
    const root = resolve(config.saveTo);
    const typesDir = resolve(root, 'types');
    const apiDir = resolve(root, 'api');

    console.log(chalk.bold.cyan(`\n🚀 Запуск генерации SDK`));

    const versions = config.apiVersions;
    if (isObject(versions) && !isString(versions)) {
      entries(versions).forEach(([key, value]) => {
        log(chalk.green(`📍 ${key} -> ${value}`));
      });
    } else if (isString(versions)) {
      console.log(chalk.magenta(`🏷️  Глобальная версия API: ${versions}`));
    }

    const credentials = config.credentialsServices;
    console.log(chalk.yellow('\n🔑 Настройки Credentials:'));
    if (isArray(credentials)) {
      forEach(credentials, (service) => {
        log(chalk.blue(`  - ${service} -> true`));
      });
    } else if (credentials === '*') {
      console.log(chalk.gray('  - Режим включен для всех сервисов (*)'));
    }

    // --- Поиск сервисов ---
    const services = await fetchServiceNames(OPENAPI_URL, URLIFY_LIST);
    console.log(
      chalk.blue(`\n🔍 Найдено сервисов: ${services.length.toString()}\n`)
    );

    for (const service of services) {
      console.log(
        chalk.bgBlue.white.bold(` ${service.original.toUpperCase()} `)
      );

      // 1. Загрузка схемы
      process.stdout.write(chalk.yellow('  📦 Загрузка схем... '));
      await fetchAndSaveServiceSchema({
        baseUrl: OPENAPI_URL,
        saveTo: typesDir,
        serviceName: service.original,
      });
      console.log(chalk.green('OK'));

      // 2. Сборка URL для сервиса
      const urlParts = [API_BASE];
      let currentVersion: string | undefined;

      if (isString(versions)) {
        currentVersion = versions;
      } else if (isObject(versions)) {
        // Ищем версию конкретно для этого сервиса в объекте
        currentVersion = versions[service.original];
      }

      if (currentVersion) {
        urlParts.push(currentVersion.replace(/^\//, ''));
      }
      urlParts.push(service.clean.replace(/^\//, ''));

      const serviceApiUrl = urlParts.join('/');

      // 3. Определение прав (Credentials)
      const withCredentials = isArray(credentials)
        ? credentials.includes(service.original)
        : credentials === '*';

      // 4. Генерация методов
      process.stdout.write(chalk.yellow('  ⚙️  Генерация методов... '));
      const midServices = config.middlewareServices;
      const useMiddleware =
        midServices === '*' ||
        (Array.isArray(midServices) && midServices.includes(service.original));
      await mkMethods({
        outputRoot: root,

        serviceName: service.original,
        baseUrl: serviceApiUrl,
        middlewarePath: config.authMiddlewarePath,
        withCredentials,
        withMiddleware: useMiddleware,
      });
      console.log(chalk.green('OK\n'));
    }

    // --- Финализация ---
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
