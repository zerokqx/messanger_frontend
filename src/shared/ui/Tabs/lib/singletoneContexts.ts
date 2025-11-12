import { type Context, createContext } from 'react';

const sourcesContext = new Map<TabsSources, Context<object | null>>();
/**
 * @description Функция для создания контекста если его не существует исключительно для TaberProvider
 * @private
 * */
export const singletoneContext = (
  source: TabsSources
): Context<object | null> => {
  const existing = sourcesContext.get(source);
  if (existing) return existing;

  const context = createContext<object | null>(null);
  sourcesContext.set(source, context);
  return context;
};
