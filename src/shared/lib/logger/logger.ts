import { useLogger } from "react-use";

// logger.ts
const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
} as const;

type LogArgs = readonly unknown[];

const CURRENT_LOG_LEVEL: number = import.meta.env.PROD
  ? LOG_LEVEL.ERROR
  : LOG_LEVEL.DEBUG; // import.meta.env.PROD — признак prod-сборки во Vite [web:50]

const timeFmt = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
}); // hour/minute/second + hourCycle управляют форматом времени [web:110][web:107]

const now = (): string => timeFmt.format(new Date());

class Logger {
  static debug(location: string, message: string, ...args: LogArgs): void {
    if (CURRENT_LOG_LEVEL <= LOG_LEVEL.DEBUG) {
      console.debug(`${now()} [DEBUG] (${location}) - ${message}:`, ...args);
    }
  }

  static info(location: string, message: string, ...args: LogArgs): void {
    if (CURRENT_LOG_LEVEL <= LOG_LEVEL.INFO) {
      console.info(`${now()} [INFO] (${location}) - ${message}:`, ...args);
    }
  }

  static warn(location: string, message: string, ...args: LogArgs): void {
    if (CURRENT_LOG_LEVEL <= LOG_LEVEL.WARN) {
      console.warn(`${now()} [WARN] (${location}) - ${message}:`, ...args);
    }
  }

  static error(location: string, message: string, ...args: LogArgs): void {
    if (CURRENT_LOG_LEVEL <= LOG_LEVEL.ERROR) {
      console.error(`${now()} [ERROR] (${location}) - ${message}:`, ...args);
    }
  }

  static createErrorMessage(
    location: string,
    message: string,
    ...args: LogArgs
  ): string {
    return `${now()} [ERROR] (${location}) - ${message}: ${args}`;
  }
  static speed() {
    if (import.meta.env.PROD && CURRENT_LOG_LEVEL <= LOG_LEVEL.DEBUG) return;
    return performance.now();
  }
  static speedLog(
    location: string,
    message: string,
    prevTime: DOMHighResTimeStamp,
    ...args: LogArgs
  ) {
    if (import.meta.env.PROD && CURRENT_LOG_LEVEL <= LOG_LEVEL.DEBUG) return;
    const currentTime = performance.now();
    console.debug(
      `${now()} [SPEED] ${location} - ${message}: ${String(currentTime - prevTime)}`,
      ...args
    );
  }
}

export default Logger;
